import { Controller, Get, Post, Body, Param, Query, UseInterceptors, UploadedFile, Patch, Delete, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../service/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { UploadFileInterceptor } from 'src/commons/upload.intercepter';
import { JwtAuthGuard } from 'src/commons/guards/jwt.guards';

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

  @Get('get-product-detail/:id')
  async findOn(@Param('id') id: string) {
    return this.productsService.getProductDetail(id);
  }
   @Patch('update/:id')
    @UseInterceptors(UploadFileInterceptor())
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file.path)
    return this.productsService.updateProduct(id, updateProductDto, file);
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}