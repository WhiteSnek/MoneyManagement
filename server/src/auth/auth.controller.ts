import { Controller, Post, Body, UseGuards, UploadedFile, Res, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { UploadFile } from './decorator';
import { LoginDto } from './dto';
import { JwtGuard } from './guard';
import { GoogleAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  async requestOtp(@Body() body: { email: string }){
    console.log(body)
    return this.authService.requestOtp(body.email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string, otp: string }){
    return this.authService.verifyOtp(body.email, body.otp);
  }

  @Post('register')
//   @UseGuards(FileGuard)
  @UploadFile('avatar') 
  async register(@UploadedFile() avatar: Express.Multer.File, @Body() dto: RegisterDto) {
    console.log(avatar, dto)
    const user = await this.authService.register(avatar,dto);
    return {
      message: 'Registration successful',
      user,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto,@Res() res: Response) {
    const user = await this.authService.login(dto, res)
    return res.status(200).json({
        message: 'Login successful',
        user,
      });
  }
  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(200).json({message: 'Logout successfull'})
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {

  }
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard) 
  async googleAuthRedirect(@Req() req, @Res() res: Response) {

    const user = req.user;
    const { access_token, refresh_token } = await this.authService.generateAccessAndRefreshToken(user.id, user.email);

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

    if(!user.dob || !user.monthlyIncome || !user.creditDate || !user.gender){
      return res.redirect('http://localhost:5173/complete-profile')
    }

    return res.redirect('http://localhost:5173/dashboard');
  }
}
