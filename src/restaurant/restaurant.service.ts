import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Restaurant } from "./restaurant.entity";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>
  ) {
  }

  async create(data): Promise<Restaurant> {
    return await this.restaurantRepository.save(data);
  }

  async all(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find();
  }

  async single(id: number): Promise<any> {
    const restaurant = await this.restaurantRepository.findOne({ id }, {relations: ["foods", "customers"]});
    if (!restaurant)
      return new NotFoundException("restaurant not found").getResponse();
    return restaurant;
  }

  async update(id: number, data): Promise<any> {
    if (!data.title) delete data.title;
    if (!data.address) delete data.address;
    const updated = await this.restaurantRepository.update(id, data);
    if (!updated.affected) throw new NotFoundException("Could not found restaurant");
    return { result: "updated" };
  }

  async delete(id: number): Promise<any> {
    const deleted = await this.restaurantRepository.delete(id);
    if (!deleted.affected) throw new NotFoundException("Could not found restaurant");
    return { result: "deleted" };
  }

  async addFoodToRestaurant(restaurantId: number, foodId: number): Promise<any> {
    try {
      await this.restaurantRepository.createQueryBuilder()
        .relation(Restaurant, "foods")
        .of(restaurantId)
        .add(foodId);
      return { result: true };
    } catch (err) {
      console.log(err);
      throw new NotFoundException("Could not found restaurant");
    }
  }

  async removeFoodToRestaurant(restaurantId: number, foodId: number): Promise<any> {
    try {
      await this.restaurantRepository.createQueryBuilder()
        .relation(Restaurant, "foods")
        .of(restaurantId)
        .remove(foodId);
      return { result: true };
    } catch (err) {
      console.log(err);
      throw new NotFoundException("Could not found restaurant");
    }
  }

  async addCustomerToRestaurant(restaurantId: number, customerId: number): Promise<any> {
    try {
      await this.restaurantRepository.createQueryBuilder()
        .relation(Restaurant, "customers")
        .of(restaurantId)
        .add(customerId);
      return { result: true };
    } catch (err) {
      console.log(err);
      throw new NotFoundException("Could not found restaurant");
    }
  }

  async removeCustomerToRestaurant(restaurantId: number, customerId: number): Promise<any> {
    try {
      await this.restaurantRepository.createQueryBuilder()
        .relation(Restaurant, "customers")
        .of(restaurantId)
        .remove(customerId);
      return { result: true };
    } catch (err) {
      console.log(err);
      throw new NotFoundException("Could not found restaurant");
    }
  }
}