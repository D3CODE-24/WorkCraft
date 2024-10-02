import { OrderController } from "#ecommerece/controllers";
import { Router } from "express";

const OrderRouter = Router();

OrderRouter.post("/", OrderController.createOrder);
OrderRouter.get("/", OrderController.getOrders);
OrderRouter.get("/:id", OrderController.getOrder);
OrderRouter.post("/:id/ship", OrderController.shipOder);

export default OrderRouter;
