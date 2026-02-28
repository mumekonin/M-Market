import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSchema } from 'src/products/schemas/products.schema';
import { Order } from '../schemas/orders.schemas';
import { OrderStatus } from 'src/commons/enums';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(ProductSchema.name) private readonly productModel: Model<ProductSchema>,
  ) {}

async createOrder( userId: string,  productId: string,  quantity: number, screenshot: Express.Multer.File ) {
  const product = await this.productModel.findById(productId);
  if (!product || product.stock <quantity) {
    throw new BadRequestException('Product unavailable or insufficient stock');
  }
  const totalPrice = product.price * quantity; 
  const newOrder = new this.orderModel({
       userId,
       productId,
       quantity,
       totalPrice,
       paymentScreenshot: screenshot.path, 
       status: 'pending',
  });
 
    product.stock -= quantity;
    await product.save();
    return await newOrder.save();
}
  async getMyOrders(userId: string) {
    const myOrder = await this.orderModel.find({userId:userId}).populate('productId').exec();
    return myOrder;
  }
  async getAllOrders() {
    const allOrder= await this.orderModel.find().populate('userId', 'name email').populate('productId').exec();
    return allOrder;
  }

async updateStatus(orderId: string, status:OrderStatus) {
  const updatedOrder = await this.orderModel.findByIdAndUpdate( orderId, { status },  {returnDocument: 'after'}).populate('productId');
  if (!updatedOrder) {
    throw new NotFoundException('Order not found');
  }
  return updatedOrder;
}
}