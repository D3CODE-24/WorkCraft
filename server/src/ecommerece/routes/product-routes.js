import { Router } from "express";
import { ProductController } from "#ecommerece/controllers";

const ProductRouter = Router();

ProductRouter.post("/", ProductController.createProduct);
ProductRouter.get("/", ProductController.getProducts);
ProductRouter.get("/:id", ProductController.getProductById);
ProductRouter.put("/:id", ProductController.updateProduct);
ProductRouter.delete("/:id", ProductController.deleteProduct);
ProductRouter.get(
  "/category/:category",
  ProductController.getProductsByCategory,
);

export default ProductRouter;
