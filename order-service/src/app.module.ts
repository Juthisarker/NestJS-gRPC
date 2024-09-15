import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { join } from 'path';
@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'postgres',  // Use 'postgres' from Docker Compose
      port: +process.env.DATABASE_PORT || 5432,      // Ensure it's a number
      username: process.env.DATABASE_USER || 'user',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'ecommerce',
      entities: [join(__dirname, '**/*.entity.{js,ts}')],  // Correct syntax for entities
      synchronize: true, 
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
