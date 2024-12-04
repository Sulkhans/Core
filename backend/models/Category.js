import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
