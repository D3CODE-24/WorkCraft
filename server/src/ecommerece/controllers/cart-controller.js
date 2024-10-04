import { UserModel as User } from "#ecommerece/models";
import { asyncErrorHandler, ErrorHandler } from "#ecommerece/middlewares";
const addToCart = asyncErrorHandler(async (req, res) => {
  const { userId, productId, price } = req.body;

  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (user.cart[productId]) {
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    return new ErrorHandler(400, e.message);
  }
});

const inceraseCart = asyncErrorHandler(async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    return new ErrorHandler(400, e.message);
  }
});

const decreaseCart = asyncErrorHandler(async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (userCart[productId] > 1) {
      userCart.total -= Number(price);
      userCart.count -= 1;
      userCart[productId] -= 1;
      user.cart = userCart;
      user.markModified("cart");
      await user.save();
      res.status(200).json(user);
    } else {
      delete userCart[productId];
      user.cart = userCart;
      user.markModified("cart");
      await user.save();
      res.status(200).json(user);
    }
  } catch (e) {
    return new ErrorHandler(400, e.message);
  }
});

const deleteFromCart = asyncErrorHandler(async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    return new ErrorHandler(400, e.message);
  }
});

const cartController = {
  addToCart,
  inceraseCart,
  decreaseCart,
  deleteFromCart,
};

export default cartController;
