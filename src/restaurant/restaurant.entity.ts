import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Food } from "../food/food.entity";

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

  @ManyToMany(type => Food)
  @JoinTable()
    foods:Food[];
}