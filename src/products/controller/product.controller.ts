import { Controller, Get, Post, Body, Param, Query, UseInterceptors, UploadedFile, Patch, Delete, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../service/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { UploadFileInterceptor } from 'src/commons/upload.intercepter';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('upload')
 @UseInterceptors(UploadFileInterceptor())
  async uploadProducts(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    if(!file.path){
      throw new BadRequestException("FILE IS REQUIRED")
    }
    return this.productsService.createProduct(createProductDto, file);
  }

  @Get('get-all-products')
  async getAllProduct() {
    return this.productsService.getAllProducts();
  }

  // @Get('get-product-detail:id')
  // async findOne(@Param('id') id: string) {
  //   return this.productsService.getProductDetail(id);
  // }
  //  @Patch('update/:id')
  // @UseInterceptors(FileInterceptor('image'))
  // async updateProduct(
  //   @Param('id') id: string,
  //   @Body() updateProductDto: UpdateProductDto,
  //   @UploadedFile() file: Express.Multer.File
  // ) {
  //   return this.productsService.updateProduct(id, updateProductDto, file);
  // }

  // @Delete('delete/:id')
  // async deleteProduct(@Param('id') id: string) {
  //   return this.productsService.deleteProduct(id);
  // }
}