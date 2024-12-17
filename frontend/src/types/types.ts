export type ErrorType = {
  status: number;
  data: {
    message: string;
  };
};

export type ProductBaseType = {
  _id?: string;
  name: string;
  images: string[];
  brand: string;
  price: number;
  category: string;
  inStock: number;
};

export type PhoneType = {
  color: string;
  screenSize: number;
  screenType: string;
  screenBrightness: number;
  refreshRate: number;
  operatingSystem: string;
  chipset: string;
  ram: number;
  storageCapacity: number;
  sdSlot: boolean;
  mainCamera: number;
  frontCamera: number;
  batteryCapacity: number;
  wirelessCharging: boolean;
  weight: number;
};

export type TabType = {
  color: string;
  model: string;
  screenSize: number;
  screenType: string;
  screenBrightness: number;
  refreshRate: number;
  resolution: string;
  cpu: string;
  cores: number;
  ram: number;
  storageCapacity: number;
  operatingSystem: string;
  simCard: boolean;
  weight: number;
};

export type LaptopType = {
  color: string;
  model: string;
  screenSize: number;
  screenType: string;
  screenBrightness: number;
  refreshRate: number;
  resolution: string;
  touchScreen: boolean;
  cpu: string;
  cores: number;
  threads: number;
  ram: number;
  ramType: string;
  storageCapacity: number;
  gpuType: string;
  gpu: string;
  vram: number;
  operatingSystem: string;
  keyboardLighting: boolean;
  weight: number;
};

export type MonitorType = {
  color: string;
  model: string;
  screenSize: number;
  screenBrightness: number;
  refreshRate: number;
  resolution: string;
  hdr: boolean;
  srgb: number;
  builtinSpeakers: boolean;
  hdmi: number;
  displayPort: number;
  dimensions: string;
  mount: string;
  weight: number;
};

export type TvType = {
  color: string;
  model: string;
  type: string;
  screenSize: number;
  refreshRate: number;
  resolution: string;
  hdr: boolean;
  cpu: string;
  cores: number;
  operatingSystem: string;
  hdmi: number;
  usb: number;
  dimensions: string;
  mount: string;
  weight: number;
};

export type ConsoleType = {
  color: string;
  model: string;
  type: string;
  screenSize: number;
  resolution: string;
  hdr: boolean;
  cpu: string;
  cores: number;
  ram: number;
  storageCapacity: number;
  dimensions: string;
  weight: number;
};

export type HeadphonesType = {
  color: string;
  model: string;
  type: string;
  connectionType: string;
  microphone: boolean;
  batteryDuration: number;
  chargingTime: number;
  weight: number;
};

export type CartItem = ProductBaseType & { quantity: number };

export type ShippingAddressType = {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
};
