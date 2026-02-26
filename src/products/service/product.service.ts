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
  async updateProduct(productId: string, updateProductDto: UpdateProductDto, newImageFile?: Express.Multer.File): Promise<ProductResponse> {
    const productIndex = this.products.findIndex(p => p._id === productId);

    if (productIndex === -1) {
      throw new NotFoundException("Product not found");
    }
    const existingProduct = this.products[productIndex];

    // If a new image is uploaded, remove the old one from storage
    if (newImageFile && existingProduct.imageUrl) {
      const oldPath = `.${existingProduct.imageUrl}`; // Adjust path to find the file
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      existingProduct.imageUrl = `/${newImageFile.path.replace(/\\/g, '/')}`;
    }

    // Update text fields
    const updatedProduct = {
      ...existingProduct,
      ...updateProductDto,
      _id: existingProduct._id,
      updatedAt: new Date()
    };

    this.products[productIndex] = updatedProduct;

    return {
      id: updatedProduct._id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      category: updatedProduct.category,
      imageUrl: updatedProduct.imageUrl,
      createdAt: updatedProduct.createdAt
    };
  }

  //  DELETE PRODUCT
  async deleteProduct(productId: string) {
    const productIndex = this.products.findIndex(p => p._id === productId);

    if (productIndex === -1) {
      throw new NotFoundException("Product not found");
    }

    const productToDelete = this.products[productIndex];

    // Remove the file from storage before removing from the array
    if (productToDelete.imageUrl) {
      const filePath = `.${productToDelete.imageUrl}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    this.products.splice(productIndex, 1);
    return {
      message: "Product deleted successfully"
    };
  }
}
