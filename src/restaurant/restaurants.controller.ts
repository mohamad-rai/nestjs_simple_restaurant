import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";

@Controller("restaurant")
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantService) {
  }

  @Post()
  async create(
    @Body("title") title: string,
    @Body("address") address: string
  ) {
    return await this.restaurantService.create({ title, address });
  }

  @Get()
  async all(){
    return await this.restaurantService.all();
  }

  @Get(':id')
  async single(@Param('id') id: number){
    return await this.restaurantService.single(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('address') address: string
  ){
    return await this.restaurantService.update(id, {title, address});
  }

  @Delete(':id')
  async delete(@Param('id') id: number){
    return this.restaurantService.delete(id);
  }

  @Post('food-menu/:id')
  async addFood(
    @Param('id') restaurantId: number,
    @Body('foodId') foodId: number
  ) {
    return await this.restaurantService.addFoodToRestaurant(restaurantId, foodId);
  }

  @Delete('food-menu/:restaurantId/:foodId')
  async removeFood(
    @Param('restaurantId') restaurantId: number,
    @Param('foodId') foodId: number
  ) {
    return await this.restaurantService.removeFoodToRestaurant(restaurantId, foodId);
  }
}