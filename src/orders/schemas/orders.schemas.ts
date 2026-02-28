import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus } from 'src/commons/enums';

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

  @Prop({ type: String,enum: Object.values(OrderStatus), default: OrderStatus.PENDING })
  status: OrderStatus; 
  @Prop()
  paymentScreenshot: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
