import { Module } from '@nestjs/common';
import { ProductsController } from './controller/product.controller';
import { ProductsService } from './service/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema ,productSchema} from './schemas/products.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports:[MongooseModule.forFeature([
        {name:ProductSchema.name,schema:productSchema}                  
     ])],
  controllers: [ProductsController],
  providers: [ProductsService,CloudinaryService]
})
export class ProductsModule {}