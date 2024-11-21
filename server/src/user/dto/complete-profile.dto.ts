import { IsNotEmpty, IsString } from "class-validator"

export class completeProfileDto {

    @IsString()
    @IsNotEmpty()
    dob: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    gender: string

    @IsString()
    @IsNotEmpty()
    monthlyIncome: string

    @IsString()
    @IsNotEmpty()
    creditDate: string
}