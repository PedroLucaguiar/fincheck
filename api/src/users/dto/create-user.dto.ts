import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: String;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: String;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: String;
}
