import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductCategory } from "src/commons/enums";

export class CreateProductDto {
   @IsString()
   proName: string;
   @IsString()
   proDescrption: string;
   @IsNumber()
   price: number;
   @IsString()
   storage?: string;
   @IsString()
   color: string;
   @IsNumber()
   stock: number;
   @IsNotEmpty()
   @IsEnum(ProductCategory)
   category: ProductCategory;

}
export class UpdateProductDto {
   @IsOptional()
   @IsString()
   proName?: string;
   @IsOptional()
   @IsString()
   proDescrption?: string;
   @IsNumber()
   @IsOptional()
   price?: number;
   @IsOptional()
   @IsString()
   storage?: string;
   @IsOptional()
   @IsString()
   color?: string;
   @IsString()
   @IsOptional()
   imageUrl?: string;
   @IsOptional()
   @IsNumber()
   stock?: number;
   @IsNotEmpty()
   @IsEnum(ProductCategory)
   category: ProductCategory;
}