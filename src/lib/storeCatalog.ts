/**
 * SUNLONG store lines + variants (PKR). Replace `image` paths with your panel photos in /public/store/ when ready.
 */

export type StoreCategory =
  | "iphone"
  | "samsung"
  | "vivo"
  | "oppo"
  | "xiaomi"
  | "huawei";

export type StoreVariant = {
  id: string;
  label: string;
  price: number;
};

export type StoreProductLine = {
  id: string;
  category: StoreCategory;
  title: string;
  /** Short blurb on store cards (can list many models). */
  description: string;
  /**
   * Full product copy on the detail page — no long model dumps; user already picked a variant.
   * Falls back to `description` if omitted.
   */
  detailDescription?: string;
  /** Put PNG/WebP in public/store/... and update path */
  image: string;
  variants: StoreVariant[];
};

const IMG = "/featured-picks-v3.png";

function v(lineId: string, label: string, price: number): StoreVariant {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return { id: `${lineId}--${slug}`, label, price };
}

export const STORE_CATEGORIES: {
  id: StoreCategory;
  label: string;
  short: string;
}[] = [
  { id: "iphone", label: "iPhone", short: "Apple" },
  { id: "samsung", label: "Samsung", short: "Samsung" },
  { id: "vivo", label: "Vivo", short: "Vivo" },
  { id: "oppo", label: "OPPO", short: "OPPO" },
  { id: "xiaomi", label: "Xiaomi / Redmi", short: "Redmi" },
  { id: "huawei", label: "Huawei / Honor", short: "Huawei" },
];

export const STORE_PRODUCT_LINES: StoreProductLine[] = [
  {
    id: "iphone-8",
    category: "iphone",
    title: "SUNLONG LCD — iPhone 8 (8G)",
    description:
      "Premium replacement unit with original display quality and touch sensitivity.",
    image: IMG,
    variants: [v("iphone-8", "White", 3500), v("iphone-8", "Black", 3500)],
  },
  {
    id: "samsung-galaxy-lcd",
    category: "samsung",
    title: "SUNLONG LCD — Samsung Galaxy (A / J series)",
    description:
      "High-quality replacement for A02s, A25, A06, A10, A10s, A32, A14, A23, A04, A04s, A13, A03, A30s, A01, A21s, A11, A12, A05, A05s, J4+, A16, A20, A20s, J6, J6 Plus, J5 Prime, J7 Prime and more.",
    detailDescription:
      "SUNLONG premium LCD assembly for Samsung Galaxy A and J series. Built for stable touch, even brightness, and colours that stay true to the original profile. The variant you choose is the exact unit we match for fit and connector layout—no guessing. Ideal for everyday use after a cracked or failed screen. Each price on the store reflects that specific model; add to cart when you are ready and complete COD checkout for delivery.",
    image: IMG,
    variants: [
      v("samsung-galaxy-lcd", "A11", 3500),
      v("samsung-galaxy-lcd", "A12", 3500),
      v("samsung-galaxy-lcd", "A13", 3500),
      v("samsung-galaxy-lcd", "A14", 3600),
      v("samsung-galaxy-lcd", "A05", 3600),
      v("samsung-galaxy-lcd", "A05s", 3600),
      v("samsung-galaxy-lcd", "A06", 3600),
      v("samsung-galaxy-lcd", "A02s", 3600),
      v("samsung-galaxy-lcd", "A20s", 3600),
      v("samsung-galaxy-lcd", "A10", 3300),
      v("samsung-galaxy-lcd", "A10s", 3500),
      v("samsung-galaxy-lcd", "A04", 3600),
      v("samsung-galaxy-lcd", "A04s", 3600),
      v("samsung-galaxy-lcd", "J5 Prime", 3000),
      v("samsung-galaxy-lcd", "J7 Prime", 3000),
      v("samsung-galaxy-lcd", "A21s", 3600),
      v("samsung-galaxy-lcd", "J6", 2800),
      v("samsung-galaxy-lcd", "J6 Plus", 2800),
      v("samsung-galaxy-lcd", "J4 Plus", 2800),
      v("samsung-galaxy-lcd", "A16", 4500),
      v("samsung-galaxy-lcd", "A32", 4600),
      v("samsung-galaxy-lcd", "A32 OLED", 8000),
    ],
  },
  {
    id: "iphone-x-series",
    category: "iphone",
    title: "SUNLONG — iPhone X / XR / XS / XS Max",
    description:
      "Black panels. Original colors + HDR. Premium LCD / OLED replacement with bright touch digitizer combo.",
    image: IMG,
    variants: [
      v("iphone-x-series", "XR", 4300),
      v("iphone-x-series", "LCD X", 4500),
      v("iphone-x-series", "OLED X", 7500),
      v("iphone-x-series", "LCD XS", 4600),
      v("iphone-x-series", "OLED XS", 7600),
      v("iphone-x-series", "LCD XS Max", 5300),
      v("iphone-x-series", "OLED XS Max", 9400),
    ],
  },
  {
    id: "iphone-13-series",
    category: "iphone",
    title: "SUNLONG — iPhone 13 Series",
    description:
      "Powerful performance, stunning design — LCD and OLED options for 13, 13 Pro, and 13 Pro Max.",
    image: IMG,
    variants: [
      v("iphone-13-series", "LCD 13", 6400),
      v("iphone-13-series", "OLED 13", 12000),
      v("iphone-13-series", "LCD 13 Pro", 7600),
      v("iphone-13-series", "OLED 13 Pro", 13500),
      v("iphone-13-series", "LCD 13 Pro Max", 9000),
      v("iphone-13-series", "OLED 13 Pro Max", 13800),
    ],
  },
  {
    id: "iphone-8-plus",
    category: "iphone",
    title: "SUNLONG LCD — iPhone 8 Plus",
    description:
      "Premium replacement with original display quality and touch sensitivity.",
    image: IMG,
    variants: [
      v("iphone-8-plus", "White", 3600),
      v("iphone-8-plus", "Black", 3600),
    ],
  },
  {
    id: "iphone-7",
    category: "iphone",
    title: "SUNLONG LCD — iPhone 7 (7G)",
    description:
      "High-quality replacement with original display and touch performance.",
    image: IMG,
    variants: [v("iphone-7", "White", 3400), v("iphone-7", "Black", 3400)],
  },
  {
    id: "iphone-7-plus",
    category: "iphone",
    title: "SUNLONG LCD — iPhone 7 Plus",
    description:
      "High-quality replacement with original display and touch performance.",
    image: IMG,
    variants: [
      v("iphone-7-plus", "White", 3600),
      v("iphone-7-plus", "Black", 3600),
    ],
  },
  {
    id: "iphone-11-series",
    category: "iphone",
    title: "SUNLONG LCD — iPhone 11 / 11 Pro / 11 Pro Max",
    description:
      "Black. Original colors and smooth touch. LCD and OLED options for Pro models.",
    image: IMG,
    variants: [
      v("iphone-11-series", "11", 4800),
      v("iphone-11-series", "11 Pro LCD", 5300),
      v("iphone-11-series", "11 Pro OLED", 8900),
      v("iphone-11-series", "11 Pro Max LCD", 5500),
      v("iphone-11-series", "11 Pro Max OLED", 10200),
    ],
  },
  {
    id: "vivo-sunlong",
    category: "vivo",
    title: "SUNLONG — Vivo display (Y / V / S series)",
    description:
      "Premium LCD replacement — high resolution, original quality, full touch support. Y27, Y85/V9, Y83, Y71, Y35, S1 Pro, Y03, Y12, Y17s, Y21, Y28, Y30, Y91, Y02, V20, Y04, Y81, Y19, Y19s, Y100, Y20, and more.",
    detailDescription:
      "SUNLONG LCD replacement for Vivo Y, V, and S series handsets. You get a sharp panel, responsive touch layer, and consistent colour out of the box. Because Vivo model names are easy to mix up, always order the variant that matches your phone’s exact model number—the page title and selected chip show what you are buying. Suitable for shops and end users who want a dependable swap without compromising on clarity.",
    image: IMG,
    variants: [
      v("vivo-sunlong", "Y04", 3600),
      v("vivo-sunlong", "V9", 3400),
      v("vivo-sunlong", "Y83", 3200),
      v("vivo-sunlong", "Y91", 3500),
      v("vivo-sunlong", "Y21", 3200),
      v("vivo-sunlong", "Y33S", 3650),
      v("vivo-sunlong", "Y36", 4300),
      v("vivo-sunlong", "Y53", 4100),
      v("vivo-sunlong", "Y27", 3800),
      v("vivo-sunlong", "Y12", 3500),
      v("vivo-sunlong", "Y19S", 3700),
      v("vivo-sunlong", "Y28", 3700),
      v("vivo-sunlong", "Y85", 3400),
      v("vivo-sunlong", "Y30", 3400),
      v("vivo-sunlong", "Y20", 3400),
      v("vivo-sunlong", "Y17s", 3500),
      v("vivo-sunlong", "Y02", 3500),
      v("vivo-sunlong", "Y03", 3500),
      v("vivo-sunlong", "Y19", 3400),
      v("vivo-sunlong", "Y81", 3400),
    ],
  },
  {
    id: "oppo-display",
    category: "oppo",
    title: "SUNLONG — OPPO display",
    description:
      "Best quality replacement screen — premium clarity, reliable performance.",
    image: IMG,
    variants: [
      v("oppo-display", "A52", 3400),
      v("oppo-display", "A92", 3400),
      v("oppo-display", "F11", 3400),
      v("oppo-display", "F11 Pro", 3700),
      v("oppo-display", "A3S", 3400),
      v("oppo-display", "A5S", 3300),
      v("oppo-display", "A53S", 3400),
      v("oppo-display", "A54", 3450),
      v("oppo-display", "A16", 3400),
      v("oppo-display", "F9", 3400),
      v("oppo-display", "A5 Black", 3200),
      v("oppo-display", "A5 White", 3200),
    ],
  },
  {
    id: "iphone-12-series",
    category: "iphone",
    title: "SUNLONG — iPhone 12 / 12 Pro / 12 Pro Max / 12 Mini",
    description:
      "LCD display replacement — original colors, full touch digitizer assembly. Black.",
    image: IMG,
    variants: [
      v("iphone-12-series", "12 / 12 Pro LCD", 6000),
      v("iphone-12-series", "12 / 12 Pro OLED", 10300),
      v("iphone-12-series", "12 Pro Max LCD", 6900),
      v("iphone-12-series", "12 Pro Max OLED", 15000),
      v("iphone-12-series", "12 Mini LCD", 6700),
      v("iphone-12-series", "12 Mini OLED", 15000),
    ],
  },
  {
    id: "redmi-c-series",
    category: "xiaomi",
    title: "SUNLONG — Redmi 9C / 12C / 13C / 14C",
    description:
      "Premium replacement — crystal clear HD panel, bright responsive touch.",
    image: IMG,
    variants: [
      v("redmi-c-series", "9C", 3400),
      v("redmi-c-series", "12C", 3400),
      v("redmi-c-series", "13C", 3400),
      v("redmi-c-series", "14C", 3400),
    ],
  },
  {
    id: "huawei-honor",
    category: "huawei",
    title: "SUNLONG — Huawei / Honor",
    description:
      "High-quality replacement — bright responsive touch. Nova, Y, Honor 8X/8C/10 Lite and more.",
    detailDescription:
      "SUNLONG display units for Huawei and Honor phones listed in our catalogue. Expect solid brightness, smooth gesture response, and a finish that matches OEM-style expectations. Pick the precise variant (Nova, Y-series, Honor, etc.) so the frame, flex, and cut-outs line up with your device. Tech Tonic ships against your COD order—confirm your model at checkout notes if you want the rider to double-check.",
    image: IMG,
    variants: [
      v("huawei-honor", "Nova 3i", 3500),
      v("huawei-honor", "Nova 7i", 3500),
      v("huawei-honor", "Nova SE", 5400),
      v("huawei-honor", "Y91", 5300),
      v("huawei-honor", "Y9", 3400),
      v("huawei-honor", "Y7", 3400),
      v("huawei-honor", "Y6", 3200),
      v("huawei-honor", "Y7A", 3400),
      v("huawei-honor", "Y7 Prime", 3400),
      v("huawei-honor", "Y9A", 5400),
      v("huawei-honor", "Honor 8X", 3500),
      v("huawei-honor", "Honor 8C", 3500),
      v("huawei-honor", "Honor 10 Lite", 3400),
    ],
  },
];

export function minPrice(line: StoreProductLine): number {
  return Math.min(...line.variants.map((x) => x.price));
}

export function maxPrice(line: StoreProductLine): number {
  return Math.max(...line.variants.map((x) => x.price));
}

export function findVariantById(
  id: string,
): { line: StoreProductLine; variant: StoreVariant } | null {
  for (const line of STORE_PRODUCT_LINES) {
    const variant = line.variants.find((x) => x.id === id);
    if (variant) return { line, variant };
  }
  return null;
}

/** For `generateStaticParams` — path segment safe ids */
export function allVariantPathParams(): { variantId: string }[] {
  return STORE_PRODUCT_LINES.flatMap((line) =>
    line.variants.map((v) => ({ variantId: v.id })),
  );
}

export function productItemHref(variantId: string) {
  return `/store/item/${encodeURIComponent(variantId)}`;
}

/** Product detail page body copy — skips long “compatible models” lists when `detailDescription` is set. */
export function descriptionForProductDetail(line: StoreProductLine): string {
  return line.detailDescription ?? line.description;
}
