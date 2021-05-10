import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn} from "typeorm";
import { Restaurant } from "../restaurant/restaurant.entity";
import { Customer } from "../customer/customer.entity";
import { Food } from "../food/food.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({default: false})
  paid: boolean;

  @ManyToOne(() => Restaurant, restaurant => restaurant.orders)
  restaurant: Restaurant;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;

  @ManyToMany(() => Food)
  @JoinTable()
  foods:Food[];
}