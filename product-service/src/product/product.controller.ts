import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
@Controller('protousers')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
  }
  @GrpcMethod('ProductService', 'GetProduct')
  async getProduct({ id }): Promise<any> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      console.log(`Product found: `);
      return {product} ;
    } catch (error) {
      console.error(`Error in GetProduct method: ${error.message}`);
      throw new Error('Failed to get product');
    }
  }

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct(data: any): Promise<any> {
    console.log('Received data:', data);
    const newProduct = this.productRepository.create(data);
    const savedProduct = await this.productRepository.save(newProduct);
    return savedProduct;
  }

  @GrpcMethod('ProductService', 'TestNoOp')
  async testNoOp(): Promise<any> {
    console.log('TestNoOp method invoked');
    return {}; // Returning an empty object
  }
}
