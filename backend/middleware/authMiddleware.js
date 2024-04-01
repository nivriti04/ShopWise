import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//user must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the JWT from the cookie (we called it token here: res.cookie('jwt', token, {...})
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//user must be an admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        //move on to the next piece of middleware
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
}

export { protect, admin };
