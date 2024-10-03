import { Router } from "express";
import { ImageController } from "#ecommerece/controllers";

const ImageRouter = Router();

ImageRouter.delete("/:public_id", ImageController.deleteImage);

export default ImageRouter;
