import { IsAlpha, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { isString } from "util";

export class CreateUserDto{
   @IsString()
   @IsNotEmpty()
   fullName:string;
   @IsNotEmpty()
   @IsEmail()
   email:string
   @IsString()
   @IsNotEmpty()
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