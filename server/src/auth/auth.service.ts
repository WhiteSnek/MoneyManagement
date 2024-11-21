import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { LoginDto, RegisterDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { S3Service } from 'src/s3/s3.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as sendgrid from '@sendgrid/mail';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private s3: S3Service,
    private jwt: JwtService,
  ) {
    sendgrid.setApiKey(this.config.get('SENDGRID_API_KEY'));
  }

  private validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  async requestOtp(email: string) {
    if (!email || !this.validateEmail(email)) {
      throw new ForbiddenException('Invalid email format');
    }

    try {
      const otp = Math.floor(100000 + Math.random() * 900000);

      await this.prisma.otp.deleteMany({
        where: { email },
      });

      await this.prisma.otp.create({
        data: {
          email,
          otp,
          expiresAt: new Date(Date.now() + 10 * 60000),
        },
      });

      const msg = {
        to: email,
        from: this.config.get('SENDGRID_FROM_EMAIL'),
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f7fa;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .otp-box {
                  font-size: 24px;
                  font-weight: bold;
                  background-color: #4CAF50;
                  color: white;
                  padding: 15px;
                  border-radius: 8px;
                  text-align: center;
                  margin-bottom: 20px;
                }
                .footer {
                  text-align: center;
                  font-size: 14px;
                  color: #555;
                  margin-top: 30px;
                }
                .footer a {
                  color: #4CAF50;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome to Our Service</h1>
                  <p>We're glad to have you!</p>
                </div>
                <div class="otp-box">
                  <p>Your OTP code is:</p>
                  <p>${otp}</p>
                </div>
                <p>This code is valid for the next 10 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
                <div class="footer">
                  <p>Best regards,</p>
                  <p>MoneyFy</p>
                  <p><a href="https://moneyfy.com">Visit our website</a></p>
                </div>
              </div>
            </body>
          </html>
        `,
      };

      await sendgrid.send(msg);

      return { message: 'OTP sent to email' };
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Error sending OTP');
    }
  }

  async verifyOtp(email: string, otpString: string) {
    if (!email || !this.validateEmail(email)) {
      throw new ForbiddenException('Invalid email format');
    }

    const otp = parseInt(otpString, 10);
    if (isNaN(otp)) {
      throw new ForbiddenException('OTP must be a numeric value');
    }

    try {
      const otpRecord = await this.prisma.otp.findUnique({
        where: { email },
      });

      if (!otpRecord) {
        throw new ForbiddenException('Invalid OTP');
      }

      const isOtpExpired = otpRecord.expiresAt < new Date();
      const isOtpInvalid = otpRecord.otp !== otp;

      if (isOtpExpired || isOtpInvalid) {
        if (isOtpExpired) {
          await this.prisma.otp.delete({ where: { email } });
        }
        throw new ForbiddenException(
          isOtpExpired ? 'OTP has expired' : 'Invalid OTP',
        );
      }

      await this.prisma.otp.delete({ where: { email } });
      return { message: 'Email is verified' };
    } catch (error) {
      throw new ForbiddenException(error.message || 'OTP verification failed');
    }
  }

  async register(avatar: Express.Multer.File, dto: RegisterDto) {
    try {
      const hash = await argon.hash(dto.password);

      let avatarUrl: string | null = null;
      if (avatar) {
        const key = `profiles/${dto.email.split('@')[0]}`
        avatarUrl = await this.s3.uploadToS3(avatar, key);
      }
      const monthlyIncome = parseFloat(dto.monthlyIncome);
      const creditDate = parseInt(dto.creditDate);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          avatar: avatarUrl,
          fullname: dto.fullname,
          dob: dto.dob,
          monthlyIncome,
          budget: monthlyIncome,
          creditDate,
          gender: dto.gender,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto, @Res() res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) throw new ForbiddenException('Credentials Incorrect');
      const pwMatches = await argon.verify(user.password, dto.password);
      if (!pwMatches) throw new ForbiddenException('Credentials Incorrect');
      const { access_token, refresh_token } =
        await this.generateAccessAndRefreshToken(user.id, user.email);

      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      });

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      });
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error during login');
    }
  }

  async generateAccessAndRefreshToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('ACCESS_TOKEN_EXPIRY'),
      secret: this.config.get('ACCESS_TOKEN_SECRET'),
    });

    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('REFRESH_TOKEN_EXPIRY'),
      secret: this.config.get('REFRESH_TOKEN_SECRET'),
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
