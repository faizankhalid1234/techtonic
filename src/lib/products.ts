export type Product = {
  id: string;
  name: string;
  price: number;
  currency: "PKR";
  image: string;
  tagline: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "sunlong-oled-pro",
    name: "SUNLONG OLED Pro Panel",
    price: 8900,
    currency: "PKR",
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80",
    tagline: "Deep blacks, flagship contrast, and smooth touch response.",
  },
  {
    id: "sunlong-original-lcd",
    name: "SUNLONG Original LCD",
    price: 5500,
    currency: "PKR",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=80",
    tagline: "Balanced color profile for daily use and reliable durability.",
  },
  {
    id: "sunlong-value-edition",
    name: "SUNLONG Value Edition",
    price: 3900,
    currency: "PKR",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    tagline: "Budget-friendly panel with clean visuals and quick response.",
  },
  {
    id: "sunlong-premium-kit",
    name: "SUNLONG Premium Replacement Kit",
    price: 9900,
    currency: "PKR",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80",
    tagline: "Pro-grade panel kit for repair shops and power users.",
  },
];
