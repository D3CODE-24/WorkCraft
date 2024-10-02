import { CartController } from "#ecommerece/controllers";
import { Router } from "express";

const CartRouter = Router();

CartRouter.post("/", CartController.addToCart);
CartRouter.delete("/", CartController.deleteFromCart);
CartRouter.get("/", CartController.getCart);

export default CartRouter;
