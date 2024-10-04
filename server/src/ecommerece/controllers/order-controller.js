import { OrderModel as Order, UserModel as User } from "#ecommerece/models";
import { asyncErrorHandler, ErrorHandler } from "#ecommerece/middlewares";

//creating an order

const cerateOrder = asyncErrorHandler(async (req, res) => {
  const { userId, cart, country, address } = req.body;
  try {
    const user = await User.findById(userId);
    const order = await Order.create({
      owner: user._id,
      products: cart,
      country,
      address,
    });
    order.count = cart.count;
    order.total = cart.total;
    await order.save();
    user.cart = { total: 0, count: 0 };
    user.orders.push(order);
    user.markModified("orders");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    return new ErrorHandler(400, e.message);
  }
});

// getting all orders;
const getOrders = asyncErrorHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("owner", ["email", "name"]);
    res.status(200).json(orders);
  } catch (e) {
    return new ErrorHandler(400, e.message);
  }
});

//shipping order

const shipping = asyncErrorHandler(async (req, res) => {
  const io = req.app.get("socketio");
  const { ownerId } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(ownerId);
    await Order.findByIdAndUpdate(id, { status: "shipped" });
    const orders = await Order.find().populate("owner", ["email", "name"]);
    await user.save();
    res.status(200).json(orders);
  } catch (e) {
    return new ErrorHandler(400, e.message);
  }
});

const orderController = {
  cerateOrder,
  getOrders,
  shipping,
};

export default orderController;
