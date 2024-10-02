import express from "express";
// import cors from "cors";

import { ProductRouter } from "#ecommerece/routes";

const ROUTE_PREFIX = "/api/v1";
const app = express();

app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:4321"],
//     credentials: true,
//   }),
// );

app.use(ROUTE_PREFIX + "/product", ProductRouter);

export default app;
