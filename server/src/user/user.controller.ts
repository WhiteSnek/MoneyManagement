import { Body, Controller, Get, Patch, Post, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ChangeProfileDto, completeProfileDto } from './dto';
import { UserService } from './user.service';
import { GetUser, UploadFile } from 'src/auth/decorator';
import { Prisma, User } from '@prisma/client';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private userService: UserService) {}
    @Get('profile')
    async getUser(@GetUser() user: User) {
        return user
    }

    @Post('complete-profile')
    async completeProfile(@Body() dto: completeProfileDto, @GetUser('email') email: string){
        const profile = await this.userService.completeProfile(dto, email);
        return {
            message: "Provide updated successfully",
            profile
        }
    }

    @Patch('add-bonus')
    async addBonus(@Body() body: {bonus: number}, @GetUser('id') userId: string, @GetUser('budget') budget: Prisma.Decimal){
        const bonus = await this.userService.addBonus(body.bonus, userId, budget)
        return {
            message: "Bonus added successfully",
            bonus
        }
    }
    @UploadFile('avatar') 
    @Patch('change-profile')
    async changeProfile(@UploadedFile() avatar: Express.Multer.File, @Body() dto: ChangeProfileDto, @GetUser('id') userId: string, @GetUser('email') prevEmail: string) {
        const response = await this.userService.changeProfile(avatar, dto, userId, prevEmail)
        return {
            status: 'success',
            message: "Profile updated successfully",
            data: response
        }
    }
}
