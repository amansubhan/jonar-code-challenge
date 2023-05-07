import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { OrderDetail } from "./orderDetail";
import { orderStatuses } from "../commons/enums";
import { Customer } from "./customer";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne((type) => Customer)
  @Column({ type: "int" })
  customerId: number;

  @Column({ type: "timestamptz" })
  orderDate: Date;

  @Column({ type: "text" })
  orderStatus: string;

  @Column({ type: "float", nullable: true })
  orderSubTotal?: number;

  @Column({ type: "float", nullable: true })
  orderDiscountTotal?: number;

  @Column({ type: "float", nullable: true })
  orderTax?: number;

  @Column({ type: "float", nullable: true })
  orderTotal?: number;

  @OneToMany((type) => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
  })
  orderDetail?: OrderDetail[];

  constructor() {
    this.customerId = 0;
    this.orderDate = new Date();
    this.orderStatus = orderStatuses.NEW;
    this.orderSubTotal = 0;
    this.orderDiscountTotal = 0;
    this.orderTax = 0;
    this.orderTotal = 0;
  }
}
