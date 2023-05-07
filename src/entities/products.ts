import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text", nullable: true })
  sku?: string;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "text", nullable: true })
  image?: string;

  constructor() {
    this.name = "";
    this.description = "";
    this.sku = "";
    this.price = 0;
    this.image = "";
  }
}
