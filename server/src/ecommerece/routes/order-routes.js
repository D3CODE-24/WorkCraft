import { OrderController } from "#ecommerece/controllers";
import { Router } from "express";

const OrderRouter = Router();

OrderRouter.post("/", OrderController.createOrder);
OrderRouter.get("/", OrderController.getOrders);
OrderRouter.patch("/:id/mark-shipped", OrderController.shipping);
OrderRouter.post("/create-payment", OrderController.createPayment);

export default OrderRouter;
