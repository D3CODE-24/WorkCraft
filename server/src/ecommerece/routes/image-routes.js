import { Router } from "express";
import { ImageController } from "#ecommerece/controllers";

const ImageRouter = Router();

ImageRouter.post("/", ImageController.deleteImage);

export default ImageRouter;
