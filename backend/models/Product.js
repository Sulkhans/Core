import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    inStock: { type: Number, required: true, default: 0 },
    details: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const phoneSchema = mongoose.Schema({
  details: {
    color: { type: String, required: true },
    screenSize: { type: Number, required: true },
    screenType: { type: String, required: true },
    screenBrightness: { type: Number, required: true },
    refreshRate: { type: Number, required: true },
    operatingSystem: { type: String, enum: ["iOS", "Android"], required: true },
    chipset: { type: String, required: true },
    ram: { type: Number, required: true },
    storageCapacity: { type: Number, required: true },
    sdSlot: { type: Boolean, required: true },
    mainCamera: { type: Number, required: true },
    frontCamera: { type: Number, required: true },
    batteryCapacity: { type: Number, required: true },
    wirelessCharging: { type: Boolean, required: true },
    weight: { type: Number, required: true },
  },
});

const laptopSchema = mongoose.Schema({
  details: {
    color: { type: String, required: true },
    model: { type: String, required: true },
    screenSize: { type: Number, required: true },
    screenType: { type: String, required: true },
    screenBrightness: { type: Number, required: true },
    refreshRate: { type: Number, required: true },
    resolution: { type: String, required: true },
    touchScreen: { type: Boolean, required: true },
    cpu: { type: String, required: true },
    cores: { type: Number, required: true },
    threads: { type: Number, required: true },
    ram: { type: Number, required: true },
    ramType: { type: String, enum: ["DDR4", "DDR5"], required: true },
    storageCapacity: { type: Number, required: true },
    gpuType: {
      type: String,
      enum: ["Dedicated", "Integrated"],
      required: true,
    },
    gpu: { type: String, required: true },
    vram: { type: Number, required: false },
    operatingSystem: {
      type: String,
      enum: ["Windows", "MacOS", "None"],
      required: true,
    },
    keyboardLighting: { type: Boolean, required: true },
    weight: { type: Number, required: true },
  },
});

const Product = mongoose.model("Product", productSchema);

const Phone = Product.discriminator("Phone", phoneSchema);
const Laptop = Product.discriminator("Laptop", laptopSchema);

export { Product, Phone, Laptop };
