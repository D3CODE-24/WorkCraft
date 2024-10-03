import express from "express";
import cors from "cors";

import {
  ProductRouter,
  CartRouter,
  OrderRouter,
  ImageRouter,
} from "#ecommerece/routes";

import { errorHandler } from "#ecommerece/middlewares";

const ROUTE_PREFIX = "/api";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(ROUTE_PREFIX + "/product", ProductRouter);
app.use(ROUTE_PREFIX + "/cart", CartRouter);
app.use(ROUTE_PREFIX + "/order", OrderRouter);
app.use(ROUTE_PREFIX + "/image", ImageRouter);
app.use(errorHandler);

export default app;
