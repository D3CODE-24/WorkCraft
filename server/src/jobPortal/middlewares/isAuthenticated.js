import jwt from "jsonwebtoken";
import { ErrorHandler, asyncErrorHandler } from "#ecommerece/middlewares";

const isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return new ErrorHandler(401, "User not authenticated");
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return new ErrorHandler(401, "Invalid token");
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    return new ErrorHandler(500, error);
  }
});
export default isAuthenticated;

