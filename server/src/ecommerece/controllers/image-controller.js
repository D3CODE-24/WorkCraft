import { cloudinary } from "#utils";
import { ErrorHandler, asyncErrorHandler } from "#ecommerece/middlewares";

const deleteImage = asyncErrorHandler(async (req, res) => {
  const { public_id } = req.params;
  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).send();
  } catch (e) {
    return new ErrorHandler(500, "Error deleting image");
  }
});

const ImageController = { deleteImage };
export default ImageController;
