/** @deprecated Prefer `STORE_PRODUCT_LINES` from `@/lib/storeCatalog` */
export type Product = {
  id: string;
  name: string;
  price: number;
  currency: "PKR";
  image: string;
  tagline: string;
};

export const PRODUCTS: Product[] = [];

export {
  STORE_CATEGORIES,
  STORE_PRODUCT_LINES,
  minPrice,
  maxPrice,
} from "./storeCatalog";
export type {
  StoreCategory,
  StoreProductLine,
  StoreVariant,
} from "./storeCatalog";
