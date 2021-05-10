import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Restaurant } from "../restaurant/restaurant.entity";

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
}