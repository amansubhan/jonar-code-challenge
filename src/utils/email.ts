import { getCustomer } from "../services/customer";
import { generateInvoice } from "./easyinvoice";
import moment from "moment";
import { OrderDetail } from "../entities/orderDetail";
import { getProduct } from "../services/products";
import { Product } from "../entities/products";

export const generateConfirmationEmail = async (
  orderId: number,
  customerId: number,
  orderDetails: OrderDetail[],
  subTotal: number,
  discount: number,
  tax: number,
  total: number
) => {
  const customer = await getCustomer(customerId);

  const products = [];
  for (const d in orderDetails) {
    const product: Product = await getProduct(orderDetails[d].productId);
    products.push({
      description: product.name,
      price: orderDetails[d].price,
      quantity: orderDetails[d].quantity,
      discount: orderDetails[d].discount,
      "tax-rate": 0,
      total: orderDetails[d].total,
    });
  }

  const pdfData = {
    client: {
      name: customer!.name,
      email: customer!.email,
    },
    sender: {
      company: "Jonar",
      address: "Sample Street 123",
      zip: "1234 AB",
      city: "Sampletown",
      country: "Samplecountry",
    },
    images: {
      logo: "",
    },
    information: {
      number: `${moment().format("YYYY")} - ${orderId}`,
      date: moment().format("MMMM Do YYYY"),
      "due-date": moment().add(15, "days").format("MMMM Do YYYY"),
    },
    products,
    bottomNotice: "Kindly pay your invoice within 15 days.",
    settings: {
      currency: "USD",
    },
    translate: {},
    customize: {},
  };

  // Generate invoice in pdf format
  await generateInvoice(pdfData);

  const message = {
    From: {
      Email: process.env.SENDER_EMAIL,
      Name: process.env.SENDER_NAME,
    },
    To: {
      Email: customer!.email,
      Name: customer!.name,
    },
    Subject: "Jonar - Order Confirmation",
    Attachment: "invoice.pdf",
    Variables: {
      datetime: new Date(),
      orderDetails: orderDetails,
      subTotal,
      discount,
      tax,
      total,
    },
  };
  // Implement to send an email with above template...
  console.log(message);
};
