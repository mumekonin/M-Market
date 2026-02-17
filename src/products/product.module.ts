import { Module } from '@nestjs/common';
import { ProductsController } from './controller/product.controller';
import { ProductsService } from './service/product.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}