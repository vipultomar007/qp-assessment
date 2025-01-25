import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column("simple-json")
  items: { itemId: number; quantity: number }[];

  @Column("decimal")
  totalPrice: number;
}
