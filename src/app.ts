import express, { Express, Request, Response } from "express";
import cors from "cors";
import { router as authRouter } from "./routes/auth";
import { router as productsRouter } from "./routes/products";
import { router as ordersRouter } from "./routes/order";
import { router as customersRouter } from "./routes/customer";
import { db } from "./utils/typeorm";
import { auth } from "./middleware/jwt";

const app: Express = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/product", auth, productsRouter);
app.use("/order", auth, ordersRouter);
app.use("/customer", auth, customersRouter);

db.then(async () => {
  console.log("Connected to database");
}).catch((error) => {
  console.log(error);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default app;
