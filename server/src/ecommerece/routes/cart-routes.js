import { CartController } from "#ecommerece/controllers";
import { Router } from "express";

const CartRouter = Router();

CartRouter.post("/add-to-cart", CartController.addToCart);
CartRouter.post("/increase-cart", CartController.inceraseCart);
CartRouter.post("/decrease-cart", CartController.decreaseCart);
CartRouter.post("/remove-from-cart", CartController.deleteFromCart);

export default CartRouter;
