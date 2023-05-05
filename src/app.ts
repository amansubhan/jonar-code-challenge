import express, { Express, Request, Response } from "express";
import { router as productsRouter } from "./routes/products";

const app: Express = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/product", productsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default app;
