import { OrderModel, UserModel } from "../models/models.js";
import { ErrorHandler, asyncErrorHandler } from "#ecommerece/middlewares";

const createOrder = asyncErrorHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await UserModel.findOne({ userId }).populate("cart");
  const cart = user.cart;

  if (!cart) {
    return new ErrorHandler(400, "Invalid user");
  }

  const order = new OrderModel({
    userId,
    products: cart.items,
    totalPrice: cart.totalPrice,
    address: user.address,
    country: user.country,
  });
  await order.save();

  res.status(200).json(order);
});

const getOrders = asyncErrorHandler(async (req, res) => {
  const orders = await OrderModel.find();
  res.status(200).json(orders);
});

const getOrder = asyncErrorHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  res.status(200).json(order);
});

const shipOder = asyncErrorHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  order.status = "shipped";
  await order.save();
  res.status(200).json(order);
});

const OrderController = {
  createOrder,
  getOrders,
  getOrder,
  shipOder,
};

export default OrderController;
