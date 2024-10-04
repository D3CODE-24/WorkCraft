import { UserModel as User } from "#ecommerece/models";
import { asyncErrorHandler, ErrorHandler } from "#ecommerece/middlewares";

const signup = asyncErrorHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (e) {
    if (e.code === 11000) return new ErrorHandler(400, "email already exists");
    return new ErrorHandler(400, e.message);
  }
});

// login

const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
    res.json(user);
  } catch (e) {
    console.log(e);
    return new ErrorHandler(400, e.message);
  }
});

// get users;

const getUsers = asyncErrorHandler(async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate("orders");
    res.json(users);
  } catch (e) {
    return new ErrorHandler(400, e.message);
  }
});

// get user orders

const getUserOrders = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("orders");
    res.json(user.orders);
  } catch (e) {
    return new ErrorHandler(400, e.message);
  }
});
// update user notifcations
const updateNotifications = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user.notifications.forEach((notif) => {
      notif.status = "read";
    });
    user.markModified("notifications");
    await user.save();
    res.status(200).send();
  } catch (e) {
    return new ErrorHandler(400, e.message);
  }
});

const userController = {
  signup,
  login,
  getUsers,
  getUserOrders,
  updateNotifications,
};

export default userController;
