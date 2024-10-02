import { UserModel, ProductModel } from "#ecommerece/models";

const addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  const user = await UserModel.findOne({ userId }).populate("cart");
  const cart = user.cart;
  const product = await ProductModel.findById(productId);

  if (!cart) {
    return res.status(400).json({ message: "Signup required" });
  } else if (!product) {
    return res.status(400).json({ message: "Invalid product" });
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
};

const deleteFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  const user = await UserModel.findOne({ userId }).populate("cart");
  const cart = user.cart;
  const product = await ProductModel.findById(productId);

  if (!cart) {
    return res.status(400).json({ message: "Signup required" });
  } else if (!product) {
    return res.status(400).json({ message: "Invalid product" });
  }

  if (cart.items[productId]) {
    cart.items[productId].quantity--;
    if (cart.items[productId].quantity === 0) {
      delete cart.items[productId];
    }
    cart.totalPrice -= product.price;
  } else {
    return res.status(400).json({ message: "Product not found in cart" });
  }

  return res.status(200).json({ message: "Product removed from cart" });
};

const getCart = async (req, res) => {
  const { userId } = req.body;
  const user = await UserModel.findOne({ userId }).populate("cart");
  const cart = user.cart;

  if (!cart) {
    return res.status(400).json({ message: "Invalid user" });
  }

  return res.status(200).json(cart);
};

const cartController = {
  addToCart,
  deleteFromCart,
  getCart,
};

export default cartController;
