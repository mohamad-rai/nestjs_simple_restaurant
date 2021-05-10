import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}

// export class Restaurant {
//   constructor(
//     public id: string,
//     public title: string,
//     public description: string,
//   ) {}
// }