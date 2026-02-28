import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) 
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'UserSchema', required: true })
  userId: Types.ObjectId; 

  @Prop({ type: Types.ObjectId, ref: 'ProductSchema', required: true })
  productId: Types.ObjectId; 

  @Prop({ required: true })
  quantity: number; 

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ 
    type: String, 
    enum: ['pending', 'shipped', 'delivered'], 
    default: 'pending' 
  })
  status: string; 
  @Prop()
  paymentScreenshot: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
