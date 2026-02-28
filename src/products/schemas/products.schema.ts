import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductCategory } from "src/commons/enums";
@Schema({ timestamps: true })
export class ProductSchema {
  @Prop()
  proName: string;
  @Prop()
  proDescrption: string;
  @Prop()
  price: number;
  @Prop()
  storage: string;
  @Prop()
  color: string;
  @Prop()
  stock: number;
  @Prop()
  imageUrl: string;
  @Prop({ type: String, enum: Object.values(ProductCategory), required: true })
  category: ProductCategory;
} export const productSchema = SchemaFactory.createForClass(ProductSchema)