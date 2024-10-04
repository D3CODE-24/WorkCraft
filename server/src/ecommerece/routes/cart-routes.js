import { CartController } from "#ecommerece/controllers";
import { Router } from "express";

const CartRouter = Router();

CartRouter.post("/add-to-cart", CartController.addToCart);
CartRouter.delete("/increase-cart", CartController.inceraseCart);
CartRouter.delete("/decrease-cart", CartController.decreaseCart);
CartRouter.delete("/remove-from-cart", CartController.deleteFromCart);

export default CartRouter;
