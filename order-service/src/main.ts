import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50052',
      package: 'order',
      protoPath: join(__dirname, '../protos/order.proto'),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      }
    },
  });

  await app.listen();
  console.log('Order Service is running');
}
bootstrap();
