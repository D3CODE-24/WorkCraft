import { OrderController } from "#ecommerece/controllers";
import { Router } from "express";

const OrderRouter = Router();

OrderRouter.post("/create-order", OrderController.cerateOrder);
OrderRouter.get("/", OrderController.getOrders);
OrderRouter.post("/:id/mark-shipped", OrderController.shipping);

export default OrderRouter;
