import dotenv from "dotenv";
dotenv.config();
import { db } from "./typeorm";
import { Product } from "../entities/products";
import products from "./products.json";
import customers from "./customers.json";
import { Customer } from "../entities/customer";
import { Order } from "../entities/order";

export const seedDB = async () => {
  try {
    console.log("Starting database seeding process");
    const orderRepository = (await db).getRepository(Order);
    await orderRepository.delete({});

    console.log(`Adding ${products.length} products...`);
    const productsRepository = (await db).getRepository(Product);

    await productsRepository.delete({});

    for (const p in products) {
      const product = products[p];
      const newProduct = new Product();
      newProduct.name = product.title;
      newProduct.description = product.description;
      newProduct.price = product.price;
      newProduct.image = product.image;
      await productsRepository.save(newProduct);
    }
    console.log(`Adding ${customers.length} customers...`);
    const customerRepository = (await db).getRepository(Customer);
    await customerRepository.delete({});

    for (const c in customers) {
      const customer = customers[c];
      const newCustomer = new Customer();
      newCustomer.name = customer.name;
      newCustomer.email = customer.email;
      await customerRepository.save(newCustomer);
    }

    console.log("Done!");
  } catch (e) {
    console.log(e);
  }
};
seedDB();
