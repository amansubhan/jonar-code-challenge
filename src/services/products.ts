import { Product } from "../entities/products";
import { db } from "../utils/typeorm";
import { getCache, setCache } from "../utils/ioredis";

export const createProduct = async (product: any) => {
  const productsRepository = (await db).getRepository(Product);
  const newProduct: Product = {
    name: product.name,
    description: product.description,
    sku: product.sku,
    price: product.price,
    image: product.image,
  };
  const result = productsRepository.create(newProduct);
  return productsRepository.save(result);
};

export const getProducts = async (limit = 10, offset = 0) => {
  const productsRepository = (await db).getRepository(Product);
  return await productsRepository.find({ take: limit, skip: offset });
};

export const getProduct = async (id: number) => {
  const cached = await getCache("product", id.toString());

  if (cached) return JSON.parse(cached);

  const productsRepository = (await db).getRepository(Product);
  const result = await productsRepository.findOneBy({ id });

  if (result) await setCache("product", id.toString(), JSON.stringify(result));
  return result;
};

// Below functions' implementations are left out due to scope limitation
export const updateProduct = async (id: number) => {};

export const deleteProduct = async (id: number) => {};

export const searchProduct = async (searchParams: any) => {};
