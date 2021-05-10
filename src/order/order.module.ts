import { Module } from "@nestjs/common";

import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Restaurant } from "../restaurant/restaurant.entity";
import { Customer } from "../customer/customer.entity";
import { Food } from "../food/food.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Restaurant, Customer, Food])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}