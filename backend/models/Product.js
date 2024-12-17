import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    images: [{ type: String, required: true }],
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

const tabSchema = mongoose.Schema({
  details: {
    color: { type: String, required: true },
    model: { type: String, required: true },
    screenSize: { type: Number, required: true },
    screenType: { type: String, required: true },
    screenBrightness: { type: Number, required: true },
    refreshRate: { type: Number, required: true },
    resolution: { type: String, required: true },
    cpu: { type: String, required: true },
    cores: { type: Number, required: true },
    ram: { type: Number, required: true },
    storageCapacity: { type: Number, required: true },
    operatingSystem: { type: String, enum: ["iOS", "Android"], required: true },
    simCard: { type: Boolean, required: true },
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
    ramType: { type: String, required: true },
    storageCapacity: { type: Number, required: true },
    gpuType: {
      type: String,
      enum: ["Dedicated", "Integrated"],
      required: true,
    },
    gpu: { type: String, required: true },
    vram: { type: Number, required: true },
    operatingSystem: {
      type: String,
      enum: ["Windows", "MacOS", "None"],
      required: true,
    },
    keyboardLighting: { type: Boolean, required: true },
    weight: { type: Number, required: true },
  },
});

const monitorSchema = mongoose.Schema({
  details: {
    color: { type: String, required: true },
    model: { type: String, required: true },
    screenSize: { type: Number, required: true },
    screenBrightness: { type: Number, required: true },
    refreshRate: { type: Number, required: true },
    resolution: { type: String, required: true },
    hdr: { type: Boolean, required: true },
    srgb: { type: Number, required: true },
    builtinSpeakers: { type: Boolean, required: true },
    hdmi: { type: Number, required: true },
    displayPort: { type: Number, required: true },
    dimensions: { type: String, required: true },
    mount: { type: String, required: true },
    weight: { type: Number, required: true },
  },
});

const tvSchema = mongoose.Schema({
  details: {
    color: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    screenSize: { type: Number, required: true },
    refreshRate: { type: Number, required: true },
    resolution: { type: String, required: true },
    hdr: { type: Boolean, required: true },
    cpu: { type: String, required: true },
    cores: { type: Number, required: true },
    operatingSystem: { type: String, required: true },
    hdmi: { type: Number, required: true },
    usb: { type: Number, required: true },
    dimensions: { type: String, required: true },
    mount: { type: String, required: true },
    weight: { type: Number, required: true },
  },
});

const consoleSchema = mongoose.Schema({
  details: {
    color: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, enum: ["Stationary", "Portable"], required: true },
    screenSize: { type: Number, required: true },
    resolution: { type: String, required: true },
    hdr: { type: Boolean, required: true },
    cpu: { type: String, required: true },
    cores: { type: Number, required: true },
    ram: { type: Number, required: true },
    storageCapacity: { type: Number, required: true },
    dimensions: { type: String, required: true },
    weight: { type: Number, required: true },
  },
});

const headphonesSchema = mongoose.Schema({
  details: {
    color: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    connectionType: { type: String, required: true },
    microphone: { type: Boolean, required: true },
    batteryDuration: { type: Number, required: true },
    chargingTime: { type: Number, required: true },
    weight: { type: Number, required: true },
  },
});

const Product = mongoose.model("Product", productSchema);

const Phone = Product.discriminator("Phone", phoneSchema);
const Tab = Product.discriminator("Tab", tabSchema);
const Laptop = Product.discriminator("Laptop", laptopSchema);
const Monitor = Product.discriminator("Monitor", monitorSchema);
const Tv = Product.discriminator("Tv", tvSchema);
const Console = Product.discriminator("Console", consoleSchema);
const Headphone = Product.discriminator("Headphone", headphonesSchema);

export { Product, Phone, Tab, Laptop, Monitor, Tv, Console, Headphone };
