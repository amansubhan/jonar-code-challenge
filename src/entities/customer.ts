import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  email: string;

  constructor() {
    this.name = "";
    this.email = "";
  }
}
