import { Router } from "express";
import { ImageController } from "#ecommerece/controllers";

const ImageRouter = Router();

console.log(ImageController.deleteImage);
ImageRouter.post("/", ImageController.deleteImage);

export default ImageRouter;
