import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderGrpcService } from './order.grpc.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderGrpcService],
})
export class OrderModule {}
