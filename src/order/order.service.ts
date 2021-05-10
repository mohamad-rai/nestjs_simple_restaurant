import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Order } from "./order.entity";
import { Restaurant } from "../restaurant/restaurant.entity";
import { Customer } from "../customer/customer.entity";
import { Food } from "../food/food.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Food)
    private foodRepository: Repository<Food>
  ) {}

  async create(data: {
    restaurantId: number,
    customerId: number,
    foods
  }): Promise<Order> {
    const newOrder = new Order();

    newOrder.restaurant = await this.restaurantRepository.findOne(data.restaurantId);
    if(!newOrder.restaurant) throw new NotFoundException("restaurant not found");

    newOrder.customer = await this.customerRepository.findOne(({where: {id: data.customerId, restaurant: data.restaurantId}}));
    if(!newOrder.customer) throw new NotFoundException("customer not found");

    newOrder.foods = await this.foodRepository.createQueryBuilder("food")
      .innerJoin("restaurant", "restaurantFood")
      .where("restaurantFood.id = :restaurantId", {restaurantId: data.restaurantId})
      .where("food.id IN  (:...foods)", {foods: data.foods})
      .getMany();
    if(!newOrder.foods) throw new NotFoundException("food not found");

    return await this.orderRepository.save(newOrder);
  }

  async all(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async single(id: number): Promise<any> {
    const order = await this.orderRepository.findOne({ id }, {relations: ["restaurant","customer","foods"]});
    if (!order)
      return new NotFoundException("Could not found order").getResponse();
    return order;
  }

  async update(id: number, data): Promise<any>{
    if(!data.firstName) delete data.firstName;
    if(!data.lastName) delete data.lastName;
    const updated = await this.orderRepository.update(id, data);
    if(!updated.affected) throw new NotFoundException("Could not found order");
    return { result: "updated" };
  }

  async delete(id: number): Promise<any> {
    const deleted = await this.orderRepository.delete(id);
    if(!deleted.affected) throw new NotFoundException("Could not found order");
    return {result: "deleted"};
  }
}