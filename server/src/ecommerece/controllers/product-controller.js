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
    res.status(500).json(err);
  }
});

const getProducts = asyncErrorHandler(async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getProductById = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
});

const deleteProduct = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getProductsByCategory = asyncErrorHandler(async (req, res) => {
  const { category } = req.params;
  try {
    const products = await ProductModel.find({ category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
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
