import { userModel } from "../models/user.model.js";
import { tokenBlacklistModel } from "../models/blacklist.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


/**
 * @name registerUser
 * @description Register a new user, expecting username,email,password
 * @access public
 */

export const registerUser = async (req, res) => {

  const { username, email, password } = req.body;

  if (!username || !email || !password) {

    return res.status(400).json({
      message: "Please provide username, email and password",
      success: false
    });
  }

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }]
  });

  if (isUserExists) {
    return res.status(400).json({
      message: "Account already exists with same username or email",
      success: false
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });

}

/**
 * @name loginUser
 * @description Login user, expecting email and password
 * @access public
 */

export const loginUser = async (req, res) => {

  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid mail or password",
      success: false
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid mail or password",
      success: false
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
}

/**
 * @name logoutUser
 * @description clear token from user cookie and blacklist token
 * @access public
 */

export const logoutUser = async (req, res) => {

  const { token } = req.cookies;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({
    message: "User logged out successfully",
    success: true
  });

}

/**
 * @name getMeController
 * @description Get current logged in user details.
 * @access private
 */

export const getMe = async (req, res) => {

  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User found successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
}