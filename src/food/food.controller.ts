import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { FoodService } from "./food.service";

@Controller("food")
export class FoodController {
  constructor(private readonly foodService: FoodService) {
  }

  @Post()
  async create(
    @Body("title") title: string,
    @Body("price") price: number
  ) {
    return await this.foodService.create({ title, price });
  }

  @Get()
  async all(){
    return await this.foodService.all();
  }

  @Get(':id')
  async single(@Param('id') id: number){
    return await this.foodService.single(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('price') price: number
  ){
    return await this.foodService.update(id, {title, price});
  }

  @Delete(':id')
  async delete(@Param('id') id: number){
    return this.foodService.delete(id);
  }
}