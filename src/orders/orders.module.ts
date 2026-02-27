import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./schemas/orders.schemas";
import { OrdersController } from "./controller/order.controllers";
import { OrdersService } from "./service/orders.service";
import { productSchema, ProductSchema } from "src/products/schemas/products.schema";

@Module({
  imports:[MongooseModule.forFeature([
        {name:Order.name,schema:OrderSchema},
        {name:ProductSchema.name,schema:productSchema}                  
     ])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrderModule{}