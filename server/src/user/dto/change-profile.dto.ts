import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

export class ChangeProfileDto {
    @IsString()
    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    creditDate: string

    @IsString()
    @IsOptional()
    monthlyIncome: string
}