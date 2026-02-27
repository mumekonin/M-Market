import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import { ProductResponse } from "../response/product.rsponse";
import { InjectModel } from "@nestjs/mongoose";
import { ProductSchema } from "../schemas/products.schema";
import { Model } from "mongoose";
import * as fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductSchema.name)
    private readonly productModel: Model<ProductSchema>
  ) { }
  // Create Product
  async createProduct(createProductDto: CreateProductDto, imageUrl: Express.Multer.File) {
    const newProduct = new this.productModel({
      proName: createProductDto.proName,
      proDescrption: createProductDto.proDescrption,
      price: createProductDto.price,
      color: createProductDto.color,
      storage: createProductDto.storage,
      imageUrl: imageUrl.path
    })

    const savedProducts = await newProduct.save();

    return {
      message: "product added succesfully",
      product: savedProducts
    }
  }
  //Retrieve all products
  async getAllProducts() {
    const products = await this.productModel.find()
    if (!products || products.length === 0) {
      throw new BadRequestException("no product is found");
    }
    const productResponse: ProductResponse[] = products.map((products) => {
      return {
        id: products._id.toString(),
        proName: products.proName,
        proDescrption: products.proDescrption,
        price: products.price,
        storage: products.storage,
        color: products.color,
      }
    });
    return productResponse
  }

  //Get single product detail
  async getProductDetail(productId: string) {
    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new NotFoundException("Product not found");
    }
    const productResponse: ProductResponse = {
      id: product._id.toString(),
      proName: product.proName,
      proDescrption: product.proDescrption,
      price: product.price,
      storage: product.storage,
      color: product.color,
    }
    return productResponse
  }
  async updateProduct(productId: string, updateProductDto: UpdateProductDto, image: Express.Multer.File) {
    const product = await this.productModel.findById(productId)
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    if (updateProductDto.proName) {
      product.proName = updateProductDto.proName;
    } if (updateProductDto.proDescrption) {
      product.proDescrption = updateProductDto.proDescrption;
    } if (updateProductDto.price) {
      product.price = updateProductDto.price;
    } if (updateProductDto.color) {
      product.color = updateProductDto.color;
    } if (updateProductDto.storage) {
      product.storage = updateProductDto.storage;
    }

    if (image && image.path) {
      // Delete old image if exists
      if (product.imageUrl) {
        try {
          await unlinkAsync(product.imageUrl);
        } catch (err) {
          console.warn('Failed to delete old image:', err.message);
        }
      }
      product.imageUrl = image.path;
    }

    const updatedProduct = await product.save();

    // Map clean response object
    const productResponse = {
      id: updatedProduct._id.toString(),
      proName: updatedProduct.proName,
      proDescrption: updatedProduct.proDescrption,
      price: updatedProduct.price,
      color: updatedProduct.color,
      storage: updatedProduct.storage,
      imageUrl: updatedProduct.imageUrl,
    };
    return productResponse;
  }

  //  DELETE PRODUCT
  async deleteProduct(productId: string) {
    const productToBeDeleted = await this.productModel.findById(productId);
    if(!productToBeDeleted){
      throw new BadRequestException("such product is not found")
    }
      //remove the file from storage
    if (productToBeDeleted.imageUrl && fs.existsSync(productToBeDeleted.imageUrl)) {
      fs.unlinkSync(productToBeDeleted.imageUrl);
    }
    //remove the book from database
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new BadRequestException("failed to product the book");
    } else {
      return {
        message: "product deleted successfully"
      };
  }
}
}
