import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductCategory } from "src/commons/enums";

export class CreateProductDto {
   @IsString()
   proName: string;
   @IsString()
   proDescrption: string;
   @IsNumber()
   price: number;
   @IsString()
   storage: string;
   @IsString()
   color: string;
   @IsString()
   imageUrl: string;
   @IsNumber()
   stock: number;
   @IsNotEmpty()
   @IsEnum(ProductCategory)
   category: ProductCategory;

}
export class UpdateProductDto {
   @IsString()
   proName?: string;
   @IsString()
   proDescrption?: string;
   @IsNumber()
   price?: number;
   @IsString()
   storage?: string;
   @IsString()
   color?: string;
   @IsString()
   imageUrl?: string;
   @IsNumber()
   stock?: number;
   @IsNotEmpty()
   @IsEnum(ProductCategory)
   category: ProductCategory;
}