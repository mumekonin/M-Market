import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 1. Allow your Frontend to connect
  app.enableCors();
  // 2. Make your DTOs and Enums work
  app.useGlobalPipes(new ValidationPipe({ transform: true ,transformOptions: {
    enableImplicitConversion: true, 
  },}));
  // 3. Make your uploaded images viewable in the browser

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server is running on: http://localhost:${port}`);
}
bootstrap();