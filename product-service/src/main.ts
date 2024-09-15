import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    // Adjust as needed
    transport: Transport.GRPC,
    options: {
  //    url: 'localhost:50051', 
      url: '0.0.0.0:50051', 
      package: 'product',
     // protoPath: './protos/product.proto',
      protoPath:  join(__dirname,'../protos/product.proto'),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      }
    },
  });

  await app.listen(); 
  console.log('Product Service is running');
}
bootstrap();
