import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import { ProductResponse } from "../response/product.rsponse";
import * as fs from 'fs';
@Injectable()
export class ProductsService {
  private products = [
    {
      _id: '101',
      name: 'Smart Watch',
      price: 199,
      description: 'Fitness tracker with GPS',
      category: 'Electronics',
      imageUrl: '/uploads/watch.jpg',
      createdAt: new Date()
    }
  ];
  constructor() { }
  // Create Product
  async createProduct(createProductDto: CreateProductDto, imageFile?: Express.Multer.File): Promise<ProductResponse> {
    const normalizedPath = imageFile?.path ? `/${imageFile.path.replace(/\\/g, '/')}` : '/uploads/default-placeholder.png';

    const newProduct = {
      _id: Date.now().toString(),
      ...createProductDto,
      imageUrl: normalizedPath,
      createdAt: new Date(),
    };

    this.products.push(newProduct);

    return {
      id: newProduct._id,
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      category: newProduct.category,
      imageUrl: newProduct.imageUrl,
      createdAt: newProduct.createdAt
    };
  }
  // Retrieve all products
  async getAllProducts(): Promise<ProductResponse[]> {
    if (this.products.length === 0) {
      throw new BadRequestException("No products found");
    }
    return this.products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt
    }));
  }

  // Get single product detail
  async getProductDetail(productId: string): Promise<ProductResponse> {
    const product = this.products.find(p => p._id === productId);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return {
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt
    };
  }
}