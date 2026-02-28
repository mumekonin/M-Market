import { Controller, Post, Param, Body, UseInterceptors, UploadedFile, Req, BadRequestException, Get, UseGuards, Patch } from '@nestjs/common';
import { OrdersService } from '../service/orders.service';
import { UploadFileInterceptor } from 'src/commons/upload.intercepter';
import { Roles } from 'src/commons/decorators/roles.decorators';
import { AuthGuard } from '@nestjs/passport';
import { DbRolesGuard } from 'src/commons/guards/roles.guards';
import { Role } from 'src/commons/enums';
import { UpdateStatusDto } from '../dto/orders.dto';
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) { }
  @UseGuards(AuthGuard('jwt'), DbRolesGuard)
  @Roles(Role.USER)
  @Post('create-order')
  @UseInterceptors(UploadFileInterceptor())
  async createOrder(@Body() body: any, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
    const userId = req.user.userId;
    console.log('File:', file);
    if (!file) throw new BadRequestException('Payment screenshot is required');
    return this.ordersService.createOrder(userId, body.productId, parseInt(body.quantity), file);
  }
  @UseGuards(AuthGuard('jwt'), DbRolesGuard)
  @Roles(Role.USER)
  @Get('myOrder')
  async getMyOrder(@Req() req: any) {
    const userId = req.user.userId;
    const result = await this.ordersService.getMyOrders(userId)
    return result
  }
  @UseGuards(AuthGuard('jwt'), DbRolesGuard)
  @Roles(Role.USER)
  @Get('allOrders')
  async getAllOrder() {
    const result = await this.ordersService.getAllOrders()
    return result
  }
  @UseGuards(AuthGuard('jwt'), DbRolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body() body: UpdateStatusDto) {
    const result = await this.ordersService.updateStatus(id, body.status);
    return {
      message: 'Status updated!',
      order: result
    }
  }
}