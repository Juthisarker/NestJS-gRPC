import { Injectable } from '@nestjs/common';
import { GrpcMethod, Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { join } from 'path';

@Injectable()
export class OrderGrpcService {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: join(__dirname, '../protos/product.proto'),
    },
  })
  private productClient: ClientGrpc;

  private productService: any;

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  onModuleInit() {
    this.productService = this.productClient.getService('ProductService');
  }

  @GrpcMethod('OrderService', 'PlaceOrder')
  async placeOrder({ productId, quantity }): Promise<any> {
    const { available } = await this.productService.CheckStock({ id: productId }).toPromise();

    if (!available) {
      return { status: 'Product not available' };
    }

    const order = this.orderRepository.create({
      productId,
      quantity,
      status: 'Placed',
    });

    await this.orderRepository.save(order);
    return { status: 'Order placed' };
  }
}
