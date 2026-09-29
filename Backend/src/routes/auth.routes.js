import express from "express";

const authRouter = express.Router();

// controller function
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

/**
 * @route POST api/auth/register
 * @description Register a new user
 * @access public
 * 
 */

authRouter.post('/register', registerUser);

/**
 * @route POST api/auth/login
 * @description Login user
 * @access public
 * 
 */

authRouter.post("/login", loginUser);

/**
 * @route POST api/auth/logout
 * @description clear token from user cookie and blacklist token
 * @access public
 * 
 */

authRouter.post("/logout", logoutUser);

/**
 * 
 * @route GET api/get-me
 * @description get current logged in user details
 * @access private
 * 
 */

authRouter.get("/get-me", authMiddleware.authUser, getMe);


export default authRouter;