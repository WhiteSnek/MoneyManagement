import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

export class ChangeProfileDto {
    @IsString()
    @IsEmail()
    @IsOptional()
    email: string

    @IsNumber()
    @IsOptional()
    creditDate: number

    @IsNumber()
    @IsOptional()
    monthlyIncome: number
}