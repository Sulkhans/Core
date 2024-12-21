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
    const { name, images, brand, price, inStock, details } = req.body;
    if (!name || !images || !brand || !price || !inStock || !details)
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
      images,
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
    const { name, images, brand, price, inStock, details } = req.body;
    if (!name || !brand || !price || !inStock || !details)
      throw new Error("All fields are required");
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("Product was not found");
    product.name = name;
    product.images = images;
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
    const filter = {};
    const productsPerPage = 12;

    const { page, brand, priceMin, priceMax, ...details } = req.query;
    const currentPage = parseInt(page) || 1;
    const category = await Category.findOne({ name: req.params.category });
    if (!category) throw new Error("Invalid product category");

    filter.category = category;
    if (brand) filter.brand = brand;
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = parseFloat(priceMin);
      if (priceMax) filter.price.$lte = parseFloat(priceMax);
    }

    if (Object.keys(details).length > 0) {
      const detailsFilters = {};
      Object.entries(details).forEach(([key, value]) => {
        if (value.includes(",")) {
          detailsFilters[`details.${key}`] = {
            $in: value.split(",").map((v) => {
              const trimmedV = v.trim();
              const isNumeric = /^-?\d+(\.\d+)?$/.test(trimmedV);
              return isNumeric ? parseFloat(trimmedV) : trimmedV;
            }),
          };
        } else {
          const isNumeric = /^-?\d+(\.\d+)?$/.test(value);
          detailsFilters[`details.${key}`] = isNumeric
            ? parseFloat(value)
            : value;
        }
      });
      Object.assign(filter, detailsFilters);
    }

    const productCount = await Product.countDocuments({ ...filter });
    const totalPages = Math.ceil(productCount / productsPerPage);
    const products = await Product.find({ ...filter })
      .limit(productsPerPage)
      .skip((page - 1) * productsPerPage);

    res.status(200).json({ products, currentPage, totalPages });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    if (!req.query.search) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const search = { name: { $regex: req.query.search, $options: "i" } };
    const productCount = await Product.countDocuments(search);
    const products = await Product.find(search);
    res.status(200).json({ count: productCount, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFilterOptions = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.query.category });
    if (!category) throw new Error("Invalid product category");

    const products = await Product.find({ category });
    const excludeKeys = [
      "_id",
      "__v",
      "__t",
      "createdAt",
      "updatedAt",
      "name",
      "images",
      "category",
      "inStock",
      "details",
      "color",
      "model",
      "dimensions",
      "weight",
    ];

    const filters = {};
    const addToFilters = (source) => {
      Object.entries(source).forEach(([key, value]) => {
        if (excludeKeys.includes(key)) return;
        if (!filters[key]) filters[key] = new Set();
        filters[key].add(value);
      });
    };
    products.forEach((product) => {
      addToFilters(product.toObject());
      if (product.details) {
        addToFilters(product.details);
      }
    });

    const filterOptions = {};
    Object.keys(filters).forEach((key) => {
      filterOptions[key] = Array.from(filters[key]).sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") {
          return a - b;
        } else {
          return a.toString().localeCompare(b.toString());
        }
      });
    });
    res.json(filterOptions);
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

const getRandomProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 6 } }]);
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
  searchProducts,
  getFilterOptions,
  getProductById,
  getNewProducts,
  getRandomProducts,
};
