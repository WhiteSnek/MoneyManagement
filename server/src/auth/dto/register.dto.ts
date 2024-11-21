import { IsEmail, IsNotEmpty, IsString, IsDate, IsOptional, IsNumber } from "class-validator";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsString()
    @IsNotEmpty()
    dob: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    // @IsNumber()
    @IsString()
    @IsNotEmpty()
    monthlyIncome: string;

    // @IsNumber()
    @IsString()
    @IsNotEmpty()
    creditDate: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}
