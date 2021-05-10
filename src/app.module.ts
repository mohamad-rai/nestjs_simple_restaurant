import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RestaurantModule } from "./restaurant/restaurant.module";
import { FoodModule } from "./food/food.module";
import { CustomerModule } from "./customer/customer.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'AB654321ab!',
      database: 'restaurant',
      autoLoadEntities: true,
      synchronize: true
    }),
    RestaurantModule,
    FoodModule,
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
