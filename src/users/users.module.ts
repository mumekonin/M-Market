import { Module } from '@nestjs/common';
import { UserController } from './controller/users.controller';
import { UserService } from './service/users.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UserSchema, userSchema } from './schema/users.shema';
@Module({
   imports:[MongooseModule.forFeature([
      {name:UserSchema.name,schema:userSchema}                  
   ])],
   controllers:[UserController],
   providers:[UserService]
}) export class UserModule{}