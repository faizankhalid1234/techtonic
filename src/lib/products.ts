export type Product = {
  id: string;
  name: string;
  price: number;
  currency: "PKR";
  image: string;
  tagline: string;
};

/** No catalog on home — checkout can still reference by id if you add items later. */
export const PRODUCTS: Product[] = [];
