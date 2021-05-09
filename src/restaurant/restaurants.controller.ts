import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";

@Controller("restaurant")
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantService) {
  }

  @Post()
  addproduct(
    @Body("title") restTitle: string,
    @Body("description") restDescription: string
  ) {
    const restaurantId = this.restaurantService.insertRestaurant(restTitle, restDescription);
    return { id: restaurantId };
  }

  @Get()
  getAllRestaurnats(){
    return this.restaurantService.getRestaurants();
  }

  @Get(':id')
  getRestaurant(@Param('id') restaurantId: string){
    return this.restaurantService.getSingleRestaurant(restaurantId);
  }
}