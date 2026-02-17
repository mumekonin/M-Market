import { Controller, Get, Post, Body, Param, Query, UseInterceptors, UploadedFile, Patch, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../service/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProducts(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    return this.productsService.createProduct(createProductDto, file);
  }

  @Get('get-all-products')
  async getAllProduct() {
    return this.productsService.getAllProducts();
  }

  @Get('get-product-detail:id')
  async findOne(@Param('id') id: string) {
    return this.productsService.getProductDetail(id);
  }

}