import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword)
      throw new Error("Please fill all inputs");
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!mailRegex.test(email))
      throw new Error("Please enter a valid email address");
    if (password !== confirmPassword) throw new Error("Passwords do not match");
    if (password.length < 6)
      throw new Error("Password must be at least 6 characters");
    const numRegex = /\d/;
    if (!numRegex.test(password))
      throw new Error("Password must contain at least one number");
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User with this email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const name = `${firstName[0].toUpperCase() + firstName.slice(1)} ${
      lastName[0].toUpperCase() + lastName.slice(1)
    }`;
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    try {
      await newUser.save();
      generateToken(res, newUser._id);
      res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Error saving user data. Please try again.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isPasswordValid) {
        generateToken(res, existingUser._id);
        res.status(200).json({
          _id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          isAdmin: existingUser.isAdmin,
        });
      } else {
        res.status(401).json({ message: "Incorrect email or password" });
      }
    } else {
      res.status(401).json({ message: "Incorrect email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: false, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.find(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: newUser.name,
        email: existingUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
      throw new Error("Please fill all inputs");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Password is incorrect");
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!mailRegex.test(email))
      throw new Error("Please enter a valid email address");

    const name = `${firstName[0].toUpperCase() + firstName.slice(1)} ${
      lastName[0].toUpperCase() + lastName.slice(1)
    }`;
    user.name = name;
    user.email = email;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) throw new Error("Current password is incorrect");
    if (newPassword !== confirmPassword)
      throw new Error("New passwords do not match");
    if (newPassword.length < 6)
      throw new Error("Password must be at least 6 characters");
    const numRegex = /\d/;
    if (!numRegex.test(newPassword))
      throw new Error("Password must contain at least one number");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne({ _id: user._id });
      res.json({ message: "User removed successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  changePassword,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
};
