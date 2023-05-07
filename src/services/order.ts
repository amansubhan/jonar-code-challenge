import { db } from "../utils/typeorm";
import { Order } from "../entities/order";
import { OrderDetail } from "../entities/orderDetail";
import { getCache, setCache } from "../utils/ioredis";
import { getCustomer } from "./customer";
import { generateConfirmationEmail } from "../utils/email";

const taxPercent = parseInt(process.env.TAX_PERCENT!) / 100 || 0.15;
export const createOrder = async (order: Order) => {
  const orderRepository = (await db).getRepository(Order);

  let subTotal = 0;
  let discountTotal = 0;

  const newOrderDetails: OrderDetail[] | undefined = [];

  if (order.orderDetail)
    order.orderDetail.forEach((detail) => {
      const orderDetail = new OrderDetail();
      orderDetail.productId = detail.productId;
      orderDetail.quantity = detail.quantity;
      orderDetail.price = detail.price;
      orderDetail.discount = detail.discount;
      orderDetail.total = detail.price * detail.quantity - detail.discount;

      subTotal += orderDetail.total;
      discountTotal += detail.discount;

      newOrderDetails.push(orderDetail);
    });

  const newOrder = new Order();
  newOrder.customerId = order.customerId;
  newOrder.orderDate = order.orderDate || new Date();
  newOrder.orderDetail = newOrderDetails;

  newOrder.orderSubTotal = subTotal;
  newOrder.orderDiscountTotal = discountTotal;
  newOrder.orderTax = subTotal * taxPercent;
  newOrder.orderTotal = subTotal + newOrder.orderTax;

  const result = await orderRepository.save(newOrder);
  await generateConfirmationEmail(
    result.id!,
    order.customerId,
    newOrderDetails,
    subTotal,
    discountTotal,
    newOrder.orderTax,
    newOrder.orderTotal
  );
  return result;
};

export const getOrders = async () => {
  const orderRepository = (await db).getRepository(Order);
  return await orderRepository.find({ relations: { orderDetail: true } });
};

export const getOrder = async (id: number) => {
  const cached = await getCache("order", id.toString());

  if (cached) return JSON.parse(cached);

  const orderRepository = (await db).getRepository(Order);
  const result = await orderRepository.findOne({
    where: { id },
    relations: { orderDetail: true },
  });

  if (result) await setCache("order", id.toString(), JSON.stringify(result));
  return result;
};

export const updateOrder = async (id: number, order: Order) => {
  const orderRepository = await (await db).getRepository(Order);
  const existingOrder = await orderRepository.findOne({ where: { id } });
  console.log(existingOrder);
  if (!existingOrder) return;

  // We should not update the order creation date
  // existingOrder.orderDate = order.orderDate;

  existingOrder.customerId = order.customerId;
  existingOrder.orderStatus = order.orderStatus;
  existingOrder.orderDetail = order.orderDetail;

  const updated = await orderRepository.save(existingOrder);
  await setCache("order", id.toString(), JSON.stringify(updated));
  return updated;
};
