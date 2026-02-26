import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import{UserSchema} from "../schema/users.shema"
import { CreateUserDto, LoginDto } from "../dto/users.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserRespones } from "../response/users.response";
import { commonUtils } from "src/commons/utils";
@Injectable()
export class UserService{
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel:Model<UserSchema>,
  ){}
  async createUser(createUserDto:CreateUserDto){
      //check if the user exists
      const exsitingUser =  await this.userModel.findOne({email:createUserDto.email})
      if(exsitingUser){
            throw new BadRequestException("user already found with this email");
      }
     //hashed password
     const hashedPwd = await bcrypt.hash(createUserDto.password,10);

     const defaultRole ="user";
     
     const newUser= new  this.userModel({
       fullName:createUserDto.fullName,
       email:createUserDto.email,
       password:hashedPwd,
       role:defaultRole
     })

     const savedUser = await newUser.save();
     
     const userResponse:UserRespones={
       fullName:savedUser.fullName,
       role:savedUser.role
     }
     return userResponse;
  }
  async userLogin(logInDto:LoginDto){
      const user = await this.userModel.findOne({email:logInDto.email})
      if(!user){
        throw new BadRequestException("user is not found");
      }
      //comper password 
      const isPwdValid = await  bcrypt.compare(logInDto.password ,user.password )

      const jwtData={
        email:user.email,
        role:user.role
      }
      const generateJwtToken = commonUtils.generateJwtToken(jwtData)

      return {
        token:generateJwtToken
      }
  }
}