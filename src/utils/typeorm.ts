import "reflect-metadata";
import { Product } from "../entities/products";
import { createConnection } from "typeorm";
import { Customer } from "../entities/customer";
import { Order } from "../entities/order";
import { OrderDetail } from "../entities/orderDetail";

export const db = createConnection({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) | 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  entities: [Product, Customer, Order, OrderDetail],
  synchronize: true,
  logging: false,
});
