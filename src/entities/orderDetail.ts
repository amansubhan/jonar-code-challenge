import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Order } from "./order";
import { Product } from "./products";

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne((type) => Order, (order) => order.id)
  order?: Order | undefined;

  @ManyToOne((type) => Product)
  @Column({ type: "int" })
  productId: number;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "float" })
  discount: number;

  @Column({ type: "float" })
  total: number;

  constructor() {
    this.productId = 0;
    this.price = 0;
    this.quantity = 0;
    this.discount = 0.0;
    this.total = 0;
  }
}
