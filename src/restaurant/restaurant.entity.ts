import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Food } from "../food/food.entity";
import { Customer } from "../customer/customer.entity";
import { Order } from "../order/order.entity";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  address: string;

  @Column({default: true})
  isActive: boolean;

  @ManyToMany(() => Food)
  @JoinTable()
    foods:Food[];

  @OneToMany(() => Customer, customer => customer.restaurant)
  customers: Customer[];

  @OneToMany(() => Order, order => order.restaurant)
  orders: Order[];
}