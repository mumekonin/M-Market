import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import { ProductResponse } from "../response/product.rsponse";
import * as fs from 'fs';
import { InjectModel } from "@nestjs/mongoose";
import { ProductSchema } from "../schemas/products.schema";
import { Model } from "mongoose";
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductSchema.name)
    private readonly productModel:Model<ProductSchema>
  ) { }
  // Create Product
  async createProduct(createProductDto: CreateProductDto,imageUrl:Express.Multer.File){
      const newProduct = new this.productModel({
        proName:createProductDto.proName,
        proDescrption:createProductDto.proDescrption,
        price:createProductDto.price,
        color:createProductDto.color,
        storage:createProductDto.storage,
        imageUrl:imageUrl.path
      })

      const savedProducts = await newProduct.save();

      return{
        message:"product added succesfully",
        product:savedProducts
      }
  }
  //Retrieve all products
  async getAllProducts(){
    const products =await this.productModel.find()
    if (!products || products.length === 0) {
      throw new BadRequestException("no product is found");
    }
    const productResponse:ProductResponse[]=products.map((products)=>{
        return{
          proName:products.proName,
          proDescrption:products.proDescrption,
          price:products.price,
          storage:products.storage,
          color:products.color,
        }
    });
    return productResponse
  }

  // // Get single product detail
  // async getProductDetail(productId: string): Promise<ProductResponse> {
  //   const product = this.products.find(p => p._id === productId);

  //   if (!product) {
  //     throw new NotFoundException("Product not found");
  //   }

  //   return {
  //     id: product._id,
  //     name: product.name,
  //     price: product.price,
  //     description: product.description,
  //     category: product.category,
  //     imageUrl: product.imageUrl,
  //     createdAt: product.createdAt
  //   };
  // }
  // async updateProduct(productId: string, updateProductDto: UpdateProductDto, newImageFile?: Express.Multer.File): Promise<ProductResponse> {
  //   const productIndex = this.products.findIndex(p => p._id === productId);

  //   if (productIndex === -1) {
  //     throw new NotFoundException("Product not found");
  //   }
  //   const existingProduct = this.products[productIndex];

  //   // If a new image is uploaded, remove the old one from storage
  //   if (newImageFile && existingProduct.imageUrl) {
  //     const oldPath = `.${existingProduct.imageUrl}`; // Adjust path to find the file
  //     if (fs.existsSync(oldPath)) {
  //       fs.unlinkSync(oldPath);
  //     }
  //     existingProduct.imageUrl = `/${newImageFile.path.replace(/\\/g, '/')}`;
  //   }

  //   // Update text fields
  //   const updatedProduct = {
  //     ...existingProduct,
  //     ...updateProductDto,
  //     _id: existingProduct._id,
  //     updatedAt: new Date()
  //   };

  //   this.products[productIndex] = updatedProduct;

  //   return {
  //     id: updatedProduct._id,
  //     name: updatedProduct.name,
  //     price: updatedProduct.price,
  //     description: updatedProduct.description,
  //     category: updatedProduct.category,
  //     imageUrl: updatedProduct.imageUrl,
  //     createdAt: updatedProduct.createdAt
  //   };
  // }

  // //  DELETE PRODUCT
  // async deleteProduct(productId: string) {
  //   const productIndex = this.products.findIndex(p => p._id === productId);

  //   if (productIndex === -1) {
  //     throw new NotFoundException("Product not found");
  //   }

  //   const productToDelete = this.products[productIndex];

  //   // Remove the file from storage before removing from the array
  //   if (productToDelete.imageUrl) {
  //     const filePath = `.${productToDelete.imageUrl}`;
  //     if (fs.existsSync(filePath)) {
  //       fs.unlinkSync(filePath);
  //     }
  //   }
  //   this.products.splice(productIndex, 1);
  //   return {
  //     message: "Product deleted successfully"
  //   };
  // }
}
