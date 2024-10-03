import express from "express";
import cors from "cors";

import {
  ProductRouter,
  CartRouter,
  OrderRouter,
  ImageRouter,
} from "#ecommerece/routes";

import {
  ApplicationRouter,
  CompanyRouter,
  JobRouter,
  UserRouter,
} from "#jobPortal/routes";

import { errorHandler } from "#ecommerece/middlewares";

const ROUTE_PREFIX = "/api";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(ROUTE_PREFIX + "/products", ProductRouter);
app.use(ROUTE_PREFIX + "/cart", CartRouter);
app.use(ROUTE_PREFIX + "/order", OrderRouter);
app.use(ROUTE_PREFIX + "/images", ImageRouter);

app.use(ROUTE_PREFIX + "/application", ApplicationRouter);
app.use(ROUTE_PREFIX + "/company", CompanyRouter);
app.use(ROUTE_PREFIX + "/job", JobRouter);
app.use(ROUTE_PREFIX + "/user", UserRouter);
app.use(errorHandler);

export default app;
