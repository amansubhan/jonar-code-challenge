import { db } from "../utils/typeorm";
import { Customer } from "../entities/customer";

export const getCustomers = async () => {
  const customerRepository = (await db).getRepository(Customer);
  return await customerRepository.find();
};

export const getCustomer = async (id: number) => {
  const customerRepository = (await db).getRepository(Customer);
  return await customerRepository.findOneBy({ id });
};

export const createCustomer = async (customer: Customer) => {
  const customerRepository = (await db).getRepository(Customer);
  return await customerRepository.save(customer);
};

// Below functions' implementations are left out due to scope limitation
export const updateCustomer = async (id: number) => {};

export const deleteCustomer = async (id: number) => {};
