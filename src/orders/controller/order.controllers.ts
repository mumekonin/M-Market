import {Controller, Post, Body, UseInterceptors, UploadedFile, Req, BadRequestException, Get} from '@nestjs/common';
import { OrdersService } from '../service/orders.service';
import { JwtAuthGuard } from 'src/commons/guards/jwt.guards';
import { UploadFileInterceptor } from 'src/commons/upload.intercepter';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) { }
  @JwtAuthGuard()
  @Post('create-order')
  @UseInterceptors(UploadFileInterceptor())
  async createOrder(@Body() body: any,@UploadedFile() file: Express.Multer.File, @Req() req: any) {
  const userId = req.user.userId;
  console.log('File:', file);
  if (!file) throw new BadRequestException('Payment screenshot is required');
  return this.ordersService.createOrder(userId, body.productId, parseInt(body.quantity), file);
}
@JwtAuthGuard()
@Get('myOrder')
async getMyOrder( @Req() req: any){
     const userId = req.user.userId;
     const result = await this.ordersService.getMyOrders(userId)
     return result
}
// @JwtAuthGuard()
@Get('allOrders')
async getAllOrder(){
    const result = await this.ordersService.getAllOrders()
    return  result
}
}