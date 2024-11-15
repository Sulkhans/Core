import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticate = async (req, res) => {
  try {
    let token;
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authenticateAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send("Not authorized as an admin");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { authenticate, authenticateAdmin };
