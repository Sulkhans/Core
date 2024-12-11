import {
  Product,
  Phone,
  Tab,
  Laptop,
  Monitor,
  Tv,
  Console,
  Headphone,
} from "../models/Product.js";
import Category from "../models/Category.js";

const createProduct = async (req, res) => {
  try {
    const { name, image, brand, price, inStock, details } = req.body;
    if (!name || !image || !brand || !price || !inStock || !details)
      throw new Error("All fields are required");
    const category = await Category.findOne({ name: req.body.category });
    if (!category) throw new Error("Invalid product category");

    const productModels = {
      phones: Phone,
      tabs: Tab,
      laptops: Laptop,
      monitors: Monitor,
      tvs: Tv,
      consoles: Console,
      headphones: Headphone,
    };
    const productModel = productModels[category.name];
    await new productModel({
      name,
      image,
      brand,
      price: parseFloat(price),
      inStock: parseInt(inStock),
      category: category._id,
      details: details,
    }).save();
    res.status(201).json({ message: "Product has been created successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, image, brand, price, inStock, details } = req.body;
    if (!name || !brand || !price || !inStock || !details)
      throw new Error("All fields are required");
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("Product was not found");
    product.name = name;
    product.image = image;
    product.brand = brand;
    product.price = parseFloat(price);
    product.inStock = parseInt(inStock);
    product.details = details;
    await product.save();
    res.status(200).json({ message: "Product has been updated successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: "Product has been deleted successfully" });
    } else return res.status(404).json({ message: "Product was not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .sort({ createAt: -1 });
    if (products) {
      return res.status(200).json(products);
    } else throw new Error("Product was not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const productsPerPage = 12;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const productCount = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(productsPerPage);
    res
      .status(200)
      .json({ products, pages: Math.ceil(productCount / productsPerPage) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json(product);
    } else throw new Error("Product was not found");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getNewProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(6);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  getProductById,
  getNewProducts,
};
