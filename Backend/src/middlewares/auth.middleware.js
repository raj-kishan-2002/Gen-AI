import jwt from "jsonwebtoken";
import { tokenBlacklistModel } from "../models/blacklist.model.js";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
      success: false
    });
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Token is invalid",
      success: false
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      success: false
    });
  }


}

export default { authUser };