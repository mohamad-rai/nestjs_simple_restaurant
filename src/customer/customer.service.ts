import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Customer } from "./customer.entity";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) {}

  async create(data: {firstName: string, lastName: string}): Promise<Customer> {
    return await this.customerRepository.save(data);
  }

  async all(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async single(id: number): Promise<any> {
    const customer = await this.customerRepository.findOne({ id });
    if (!customer)
      return new NotFoundException("Could not found customer").getResponse();
    return customer;
  }

  async update(id: number, data): Promise<any>{
    if(!data.firstName) delete data.firstName;
    if(!data.lastName) delete data.lastName;
    const updated = await this.customerRepository.update(id, data);
    if(!updated.affected) throw new NotFoundException("Could not found customer");
    return { result: "updated" };
  }

  async delete(id: number): Promise<any> {
    const deleted = await this.customerRepository.delete(id);
    if(!deleted.affected) throw new NotFoundException("Could not found customer");
    return {result: "deleted"};
  }
}