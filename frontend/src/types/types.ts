export type ErrorType = {
  status: number;
  data: {
    message: string;
  };
};

export type ProductBaseType = {
  name: string;
  image: string;
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
  vram?: number;
  operatingSystem: string;
  keyboardLighting: boolean;
  weight: number;
};
