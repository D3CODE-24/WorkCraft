import { OrderModel, UserModel } from "../models/models.js";

const createOrder = async (req, res) => {
  const { userId } = req.body;
  const user = await UserModel.findOne({ userId }).populate("cart");
  const cart = user.cart;

  if (!cart) {
    return res.status(400).json({ message: "Invalid user" });
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
};

const getOrders = async (req, res) => {
  const orders = await OrderModel.find();
  res.status(200).json(orders);
};

const getOrder = async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  res.status(200).json(order);
};

const shipOder = async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  order.status = "shipped";
  await order.save();
  res.status(200).json(order);
};

const OrderController = {
  createOrder,
  getOrders,
  getOrder,
  shipOder,
};

export default OrderController;
