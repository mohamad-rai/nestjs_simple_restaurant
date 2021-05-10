import { Module } from "@nestjs/common";

import { RestaurantsController } from "./restaurants.controller";
import { RestaurantService } from "./restaurant.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "./restaurant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  controllers: [RestaurantsController],
  providers: [RestaurantService],
})
export class RestaurantModule {}