import Order from "../models/Order.js";
import { Product } from "../models/Product.js";

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    const dbProdcuts = await Product.find({
      _id: { $in: items.map((item) => item._id) },
    });
    const orderProducts = items.map((clientItem) => {
      const orderItem = dbProdcuts.find(
        (dbItem) => dbItem._id.toString() === clientItem._id
      );
      if (!orderItem) throw new Error(`${clientItem._id} was not found`);
      return {
        product: clientItem._id,
        name: orderItem.name,
        images: orderItem.images,
        price: orderItem.price,
        quantity: clientItem.quantity,
      };
    });

    const totalPrice = parseFloat(
      orderProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    const order = await new Order({
      user: req.user,
      items: orderProducts,
      shippingAddress,
      paymentMethod,
      totalPrice,
    }).save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "user",
      "id name"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      return res.status(404).json({ message: "Order was not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email: req.body.payer.email,
      };
      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      return res.status(404).json({ message: "Order was not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      return res.status(404).json({ message: "Order was not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  markOrderAsPaid,
  markOrderAsDelivered,
};
