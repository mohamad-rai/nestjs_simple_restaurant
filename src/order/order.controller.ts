import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Post()
  async create(
    @Body('restaurantId') restaurantId: number,
    @Body('customerId') customerId: number,
    @Body('foods') foods
  ) {
    return await this.orderService.create({
      restaurantId,
      customerId,
      foods
    });
  }

  @Get()
  async all(){
    return await this.orderService.all();
  }

  @Get(':id')
  async single(@Param('id') id: number){
    return await this.orderService.single(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string
  ){
    return await this.orderService.update(id, {firstName, lastName});
  }

  @Delete(':id')
  async delete(@Param('id') id: number){
    return this.orderService.delete(id);
  }
}