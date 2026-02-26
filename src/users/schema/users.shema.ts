import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({timestamps:true})

export class UserSchema extends Document{
    @Prop()
    fullName:string;
    @Prop()
    email:string;
    @Prop()
    password:string;
    @Prop()
    role:string
}export const userSchema = SchemaFactory.createForClass(UserSchema)