import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;
}