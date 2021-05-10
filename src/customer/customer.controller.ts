import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CustomerService } from "./customer.service";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {
  }

  @Post()
  async create(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string
  ) {
    return await this.customerService.create({ firstName, lastName });
  }

  @Get()
  async all(){
    return await this.customerService.all();
  }

  @Get(':id')
  async single(@Param('id') id: number){
    return await this.customerService.single(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string
  ){
    return await this.customerService.update(id, {firstName, lastName});
  }

  @Delete(':id')
  async delete(@Param('id') id: number){
    return this.customerService.delete(id);
  }
}