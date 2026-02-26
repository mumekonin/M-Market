import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../service/users.service";
import { CreateUserDto, LoginDto } from "../dto/users.dto";
@Controller('user')
export class UserController{
  constructor(
     private readonly userService:UserService
  ){}
  @Post('register')
  async createUser(@Body() createUserDto:CreateUserDto){
    const result = await this.userService.createUser(createUserDto)
    return result
  }
  @Post('login')
  async userLogin(@Body() logiDto:LoginDto){
    const result =await this.userService.userLogin(logiDto)
    return result
  }
}