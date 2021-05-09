import { Injectable, NotFoundException } from "@nestjs/common";
import {Restaurant} from "./restaurant.model";

@Injectable()
export class RestaurantService {
  restaurants: Restaurant[] = [];

  insertRestaurant(title: string, desc: string){
    const id = Math.random().toString();
    const newRestaurant = new Restaurant(id, title, desc);
    this.restaurants.push(newRestaurant);
    return id;
  }

  getRestaurants(){
    return [...this.restaurants];
  }

  getSingleRestaurant(restaurantId: string){
    const restaurant = this.restaurants.find(rest => rest.id === restaurantId);
    if(!restaurant)
      return new NotFoundException('restaurant not found').getResponse();
    return {...restaurant};
  }
}