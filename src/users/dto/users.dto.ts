import { IsAlpha, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { isString } from "util";

export class CreateUserDto{
   @IsString()
   @IsAlpha()
   @IsNotEmpty()
   fullName:string;
   @IsEmail()
   email:string
   @IsString()
   @IsAlpha()
   password:string
}
export class LoginDto{
   @IsEmail()
   @IsNotEmpty()
   email:string;
   @IsString()
   @IsNotEmpty()
   password:string;
}