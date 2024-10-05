import { ProductModel } from "#ecommerece/models";
import { ErrorHandler, asyncErrorHandler } from "#ecommerece/middlewares";

const createProduct = asyncErrorHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    images: pictures,
    manufacturer,
  } = req.body;
  const product = new ProductModel({
    name,
    description,
    price,
    category,
    pictures,
    manufacturer,
  });

  try {
    const response = await product.save();
    res.status(201).json(response);
  } catch (err) {
    return new ErrorHandler(500, err);
  }
});

const getProducts = asyncErrorHandler(async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    return new ErrorHandler(500, err);
  }
});

const getProductById = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    const similar = await ProductModel.find({
      category: product.category,
    }).limit(5); //confirm with sharon
    res.status(200).json({ product, similar });
  } catch (err) {
    return new ErrorHandler(500, err);
  }
});

const updateProduct = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    category,
    images: pictures,
    manufacturer,
  } = req.body;
  try {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { name, description, price, category, pictures, manufacturer },
      { new: true },
    );
    res.status(200).json(product);
  } catch (err) {
    return new ErrorHandler(500, err);
  }
});

const deleteProduct = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (err) {
    return new ErrorHandler(500, err);
  }
});

const getProductsByCategory = asyncErrorHandler(async (req, res) => {
  const { category } = toLowerCase(req.params);
  try {
    let products;
    if (category !== "all") {
      products = await ProductModel.find({ category });
    } else {
      products = await ProductModel.find();
    }
    res.status(200).json(products);
  } catch (err) {
    return new ErrorHandler(500, err);
  }
});

const productController = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};

export default productController;
