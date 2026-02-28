import { Controller, Get, Post, Body, Param, Query, UseInterceptors, UploadedFile, Patch, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { ProductsService } from '../service/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { UploadFileInterceptor } from 'src/commons/upload.intercepter';
import { AuthGuard } from '@nestjs/passport';
import { DbRolesGuard } from 'src/commons/guards/roles.guards';
import { Roles } from 'src/commons/decorators/roles.decorators';
import { Role } from 'src/commons/enums';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  @UseGuards(AuthGuard('jwt'), DbRolesGuard)
  @Roles(Role.ADMIN)
  @Post('upload')
  @UseInterceptors(UploadFileInterceptor())
  async uploadProducts(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    if (!file.path) {
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
  @UseGuards(AuthGuard('jwt'), DbRolesGuard)
  @Roles(Role.ADMIN)
  @Patch('update/:id')
  @UseInterceptors(UploadFileInterceptor())
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.productsService.updateProduct(id, updateProductDto, file);
  }
  @UseGuards(AuthGuard('jwt'), DbRolesGuard)
  @Roles(Role.USER)
  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
  @Get('search-products')
  async searchProduct(@Query('key') key: string){
    const product = await this.productsService.searchProduct(key);
    return product
  }
}