import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Food } from "./food.entity";

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>
  ) {}

  async create(data: {title: string, price: number}): Promise<Food> {
    return await this.foodRepository.save(data);
  }

  async all(): Promise<Food[]> {
    return await this.foodRepository.find();
  }

  async single(id: number): Promise<any> {
    const food = await this.foodRepository.findOne({ id });
    if (!food)
      return new NotFoundException("Could not found food").getResponse();
    return food;
  }

  async update(id: number, data): Promise<any>{
    if(!data.title) delete data.title;
    if(!data.price) delete data.price;
    const updated = await this.foodRepository.update(id, data);
    if(!updated.affected) throw new NotFoundException("Could not found food");
    return { result: "updated" };
  }

  async delete(id: number): Promise<any> {
    const deleted = await this.foodRepository.delete(id);
    if(!deleted.affected) throw new NotFoundException("Could not found food");
    return {result: "deleted"};
  }
}