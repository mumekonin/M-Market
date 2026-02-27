import { Prop ,Schema, SchemaFactory} from "@nestjs/mongoose";
@Schema({timestamps:true})
export class ProductSchema{
  @Prop()
  proName:string;
  @Prop()
  proDescrption:string;
  @Prop()
  price:number;
  @Prop()
  storage:string;
  @Prop()
  color:string;
  @Prop()
  stock:number;
  @Prop()
  imageUrl:string;
} export const  productSchema = SchemaFactory.createForClass(ProductSchema)