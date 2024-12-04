import Category from "../models/Category.js";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) throw new Error("Category name is required");
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) throw new Error("Category already exists");
    const category = await new Category({ name }).save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    if (!category)
      return res.status(404).json({ message: "Category was not found" });
    if (!name.trim())
      return res.status(404).json({ message: "Category name is required" });
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    if (category) {
      await Category.deleteOne({ _id: category._id });
      res.json({ message: "Category has been deleted successfully" });
    } else res.status(404).json({ message: "Category was not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find({ _id: req.params.id });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const category = await Category.find({});
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
};
