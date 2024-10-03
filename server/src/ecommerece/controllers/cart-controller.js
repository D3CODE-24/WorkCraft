import { UserModel, ProductModel } from "#ecommerece/models";
import { ErrorHandler, asyncErrorHandler } from "#ecommerece/middlewares";

const addToCart = asyncErrorHandler(async (req, res) => {
  const { userId, productId } = req.body;
  const user = await UserModel.findOne({ userId }).populate("cart");
  const cart = user.cart;
  const product = await ProductModel.findById(productId);

  if (!cart) {
    return new ErrorHandler(400, "Signup required");
  } else if (!product) {
    return new ErrorHandler(400, "Invalid product");
  }

  if (cart.items[productId]) {
    cart.items[productId].quantity++;
  } else {
    cart.items[productId] = {
      productId,
      quantity: 1,
    };
  }
  cart.totalPrice += product.price;
  return res.status(200).json({ message: "Product added to cart" });
});

const deleteFromCart = asyncErrorHandler(async (req, res) => {
  const { userId, productId } = req.body;
  const user = await UserModel.findOne({ userId }).populate("cart");
  const cart = user.cart;
  const product = await ProductModel.findById(productId);

  if (!cart) {
    return new ErrorHandler(400, "Signup required");
  } else if (!product) {
    return new ErrorHandler(400, "Invalid product");
  }

  if (cart.items[productId]) {
    cart.items[productId].quantity--;
    if (cart.items[productId].quantity === 0) {
      delete cart.items[productId];
    }
    cart.totalPrice -= product.price;
  } else {
    return new ErrorHandler(400, "Product not found in cart");
  }

  return res.status(200).json({ message: "Product removed from cart" });
});

const getCart = asyncErrorHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await UserModel.findOne({ userId }).populate("cart");
  const cart = user.cart;

  if (!cart) {
    return new ErrorHandler(400, "Invalid user");
  }

  return res.status(200).json(cart);
});

const cartController = {
  addToCart,
  deleteFromCart,
  getCart,
};

export default cartController;
