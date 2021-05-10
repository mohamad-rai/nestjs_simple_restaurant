import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Restaurant } from "../restaurant/restaurant.entity";
import { Order } from "../order/order.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.customers)
  restaurant: Restaurant;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];
}