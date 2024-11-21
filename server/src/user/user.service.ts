import { ForbiddenException, Injectable, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChangeProfileDto, completeProfileDto } from "./dto";
import { JwtGuard } from "src/auth/guard";
import * as argon from "argon2";
import { Prisma } from "@prisma/client";
import { S3Service } from "src/s3/s3.service";
@Injectable()
@UseGuards(JwtGuard)
export class UserService {
  constructor(
    private prisma: PrismaService,
    private s3: S3Service
  ) {}

  async completeProfile(dto: completeProfileDto, email: string) {
    const monthlyIncome = parseInt(dto.monthlyIncome);
    const creditDate = parseInt(dto.creditDate);

    const hash = await argon.hash(dto.password);
    try {
      const profile = await this.prisma.user.update({
        where: { email },
        data: {
          dob: dto.dob,
          gender: dto.gender,
          password: hash,
          monthlyIncome,
          creditDate,
        },
      });
      delete profile.password;
      return profile;
    } catch (error) {
      throw new ForbiddenException("Error updating details");
    }
  }

  async addBonus(bonus: number, userId: string, budget: Prisma.Decimal) {
    try {
      if (!bonus || bonus <= 0)
        throw new ForbiddenException("Bonus must be greater than 0");
      const bonusDecimal = new Prisma.Decimal(bonus);
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          budget: budget.add(bonusDecimal),
        },
      });
      return user;
    } catch (error) {
      throw new ForbiddenException("Error adding bonus");
    }
  }

  async updateBudget() {
    try {
      const users = await this.prisma.user.findMany();

      const currentDate = new Date().getDate();

      for (const user of users) {
        if (user.creditDate === currentDate) {
          await this.prisma.user.update({
            where: { id: user.id },
            data: { budget: user.budget.add(user.monthlyIncome) },
          });
        }
      }
    } catch (error) {
      throw new ForbiddenException("Error updating budgets");
    }
  }
  async changeProfile(
    avatar: Express.Multer.File | null,
    dto: ChangeProfileDto,
    userId: string,
    prevEmail: string
  ) {
    let avatarUrl: string | null = null;
  
    try {
      if (avatar) {
        const delKey = `profiles/${prevEmail.split("@")[0]}`;
        const newKey = `profiles/${(dto.email || prevEmail).split("@")[0]}`;
        if (dto.email && dto.email !== prevEmail) {
          await this.s3.deleteFromS3(delKey);
        }

        avatarUrl = await this.s3.uploadToS3(avatar, newKey);
      }
  
      const updateData: any = {
        email: dto.email || prevEmail, // Retain previous email if not updated
      };
  
      // Conditionally include fields only if provided
      if (avatarUrl) {
        updateData.avatar = avatarUrl;
      }
      if (dto.monthlyIncome) {
        updateData.monthlyIncome = dto.monthlyIncome;
      }
      if (dto.creditDate) {
        updateData.creditDate = dto.creditDate;
      }
  
      // Update user in the database
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
      return user;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile. Please try again.");
    }
  }
}
