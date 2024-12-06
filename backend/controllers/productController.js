import formidable from "formidable";
import { Phone, Laptop } from "../models/Product.js";
import Category from "../models/Category.js";

const createProduct = async (req, res) => {
  try {
    const form = formidable({ keepExtensions: true, multiples: false });
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(new Error("Error parsing form data"));
        resolve({ fields, files });
      });
    });

    const { name, image, brand, price, inStock, details } = fields;
    if (!name || !image || !brand || !price || !inStock || !details)
      throw new Error("All fields are required");
    const category = await Category.findOne({ name: fields.category });
    if (!category) throw new Error("Invalid product category");

    const productModels = {
      phones: Phone,
      laptops: Laptop,
    };
    const productModel = productModels[category.name];
    await new productModel({
      name,
      image,
      brand,
      price: parseFloat(price),
      category: category._id,
      inStock: parseInt(inStock),
      details: JSON.parse(details),
    }).save();
    res.status(201).json({ message: "Product has been created successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createProduct };
