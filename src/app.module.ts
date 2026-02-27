import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { JwtStrategy } from './commons/guards/jwt.sstrategy';
import { OrderModule } from './orders/orders.module';

@Module({
  imports: [  
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    })
    ,ProductsModule,UserModule,OrderModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
