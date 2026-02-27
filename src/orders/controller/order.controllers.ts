import {
  Controller, Post, Body, UseInterceptors, UploadedFile, Req, BadRequestException,
  UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { OrdersService } from '../service/orders.service';
import { JwtAuthGuard } from 'src/commons/guards/jwt.guards';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) { }
  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  @UseInterceptors(FileInterceptor('screenshot', {
    storage: diskStorage({
      destination: './uploads/payments',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `PAYMENT-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async createOrder(@Body() body: any,@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    console.log(file)
    if (!file) {
      throw new BadRequestException('Payment screenshot is required');
    } if (!body.productId) {
      throw new BadRequestException('Product ID is required');
    } if (!body.quantity) {
      throw new BadRequestException('Quantity is required');
    }// 2. Data Extraction & Parsing
    const productId = body.productId;
    const quantity = parseInt(body.quantity);

    // Ensure you have a JWT Guard enabled to get req.user
    const userId = req.user.userId;
    if (!userId) throw new BadRequestException('User authentication failed');


    return this.ordersService.createOrder(userId, productId, quantity, file);
  }
}