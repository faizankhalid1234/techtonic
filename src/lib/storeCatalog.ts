/**
 * Tech Tonic store lines + variants (PKR). Replace `image` paths with your panel photos in /public/store/ when ready.
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
  /** Short family name shown in shop (e.g. "iPhone 11", "Galaxy A10–A16"). */
  seriesName: string;
  /** Short blurb on store cards (can list many models). */
  description: string;
  /**
   * Full product copy on the detail page — no long model dumps; user already picked a variant.
   * Falls back to `description` if omitted.
   */
  detailDescription?: string;
  /** Primary panel photo (cart, cards) */
  image: string;
  /** Extra panel angles for product gallery — defaults to shared panel shots */
  gallery?: string[];
  variants: StoreVariant[];
};

const IMG = "/featured-picks-v3.png";

/** Tech Tonic panel product photos only (not third-party listing images). */
export const PANEL_GALLERY_IMAGES = [
  "/featured-picks-v3.png",
  "/featured-picks-v2.png",
  "/featured-picks.png",
] as const;

export function galleryImagesForLine(line: StoreProductLine): string[] {
  const extra = line.gallery?.length ? line.gallery : [...PANEL_GALLERY_IMAGES];
  return [...new Set([line.image, ...extra])];
}

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
    id: "iphone-7",
    category: "iphone",
    title: "Tech Tonic LCD — iPhone 7 / 7 Plus",
    seriesName: "iPhone 7",
    description: "High-quality replacement with original display and touch performance.",
    image: IMG,
    variants: [
      v("iphone-7", "7 White", 3400),
      v("iphone-7", "7 Black", 3400),
      v("iphone-7", "7 Plus White", 3600),
      v("iphone-7", "7 Plus Black", 3600),
    ],
  },
  {
    id: "iphone-8",
    category: "iphone",
    title: "Tech Tonic LCD — iPhone 8 / 8 Plus",
    seriesName: "iPhone 8",
    description:
      "Premium replacement unit with original display quality and touch sensitivity.",
    image: IMG,
    variants: [
      v("iphone-8", "8 White", 3500),
      v("iphone-8", "8 Black", 3500),
      v("iphone-8", "8 Plus White", 3600),
      v("iphone-8", "8 Plus Black", 3600),
    ],
  },
  {
    id: "iphone-x-series",
    category: "iphone",
    title: "Tech Tonic — iPhone X / XR / XS / XS Max",
    seriesName: "iPhone X · XR · XS",
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
    id: "iphone-11-series",
    category: "iphone",
    title: "Tech Tonic LCD — iPhone 11 / 11 Pro / 11 Pro Max",
    seriesName: "iPhone 11",
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
    id: "iphone-12-series",
    category: "iphone",
    title: "Tech Tonic — iPhone 12 / 12 Pro / 12 Pro Max / 12 Mini",
    seriesName: "iPhone 12",
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
    id: "iphone-13-series",
    category: "iphone",
    title: "Tech Tonic — iPhone 13 Series",
    seriesName: "iPhone 13",
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
    id: "samsung-a0x",
    category: "samsung",
    title: "Tech Tonic LCD — Samsung Galaxy A0x",
    seriesName: "Galaxy A02–A06",
    description: "Premium LCD for Galaxy A02s, A04, A04s, A05, A05s, A06.",
    image: IMG,
    variants: [
      v("samsung-a0x", "A02s", 3600),
      v("samsung-a0x", "A04", 3600),
      v("samsung-a0x", "A04s", 3600),
      v("samsung-a0x", "A05", 3600),
      v("samsung-a0x", "A05s", 3600),
      v("samsung-a0x", "A06", 3600),
    ],
  },
  {
    id: "samsung-a1x",
    category: "samsung",
    title: "Tech Tonic LCD — Samsung Galaxy A10–A16",
    seriesName: "Galaxy A10–A16",
    description: "Premium LCD for Galaxy A10, A11, A12, A13, A14, A16 and siblings.",
    image: IMG,
    variants: [
      v("samsung-a1x", "A10", 3300),
      v("samsung-a1x", "A10s", 3500),
      v("samsung-a1x", "A11", 3500),
      v("samsung-a1x", "A12", 3500),
      v("samsung-a1x", "A13", 3500),
      v("samsung-a1x", "A14", 3600),
      v("samsung-a1x", "A16", 4500),
    ],
  },
  {
    id: "samsung-a2x",
    category: "samsung",
    title: "Tech Tonic LCD — Samsung Galaxy A20–A32",
    seriesName: "Galaxy A20–A32",
    description: "Premium LCD / OLED for Galaxy A20s, A21s, A32.",
    image: IMG,
    variants: [
      v("samsung-a2x", "A20s", 3600),
      v("samsung-a2x", "A21s", 3600),
      v("samsung-a2x", "A32", 4600),
      v("samsung-a2x", "A32 OLED", 8000),
    ],
  },
  {
    id: "samsung-j",
    category: "samsung",
    title: "Tech Tonic LCD — Samsung Galaxy J series",
    seriesName: "Galaxy J series",
    description: "Premium LCD for Galaxy J4+, J5 Prime, J6, J6 Plus, J7 Prime.",
    image: IMG,
    variants: [
      v("samsung-j", "J4 Plus", 2800),
      v("samsung-j", "J5 Prime", 3000),
      v("samsung-j", "J6", 2800),
      v("samsung-j", "J6 Plus", 2800),
      v("samsung-j", "J7 Prime", 3000),
    ],
  },
  {
    id: "vivo-y0",
    category: "vivo",
    title: "Tech Tonic — Vivo Y02 / Y03 / Y04",
    seriesName: "Vivo Y02–Y04",
    description: "Premium LCD for Vivo Y02, Y03, Y04.",
    image: IMG,
    variants: [
      v("vivo-y0", "Y02", 3500),
      v("vivo-y0", "Y03", 3500),
      v("vivo-y0", "Y04", 3600),
    ],
  },
  {
    id: "vivo-y1",
    category: "vivo",
    title: "Tech Tonic — Vivo Y12–Y19",
    seriesName: "Vivo Y12–Y19",
    description: "Premium LCD for Vivo Y12, Y17s, Y19, Y19S.",
    image: IMG,
    variants: [
      v("vivo-y1", "Y12", 3500),
      v("vivo-y1", "Y17s", 3500),
      v("vivo-y1", "Y19", 3400),
      v("vivo-y1", "Y19S", 3700),
    ],
  },
  {
    id: "vivo-y2",
    category: "vivo",
    title: "Tech Tonic — Vivo Y20–Y28",
    seriesName: "Vivo Y20–Y28",
    description: "Premium LCD for Vivo Y20, Y21, Y27, Y28.",
    image: IMG,
    variants: [
      v("vivo-y2", "Y20", 3400),
      v("vivo-y2", "Y21", 3200),
      v("vivo-y2", "Y27", 3800),
      v("vivo-y2", "Y28", 3700),
    ],
  },
  {
    id: "vivo-y3",
    category: "vivo",
    title: "Tech Tonic — Vivo Y30–Y36",
    seriesName: "Vivo Y30–Y36",
    description: "Premium LCD for Vivo Y30, Y33S, Y36.",
    image: IMG,
    variants: [
      v("vivo-y3", "Y30", 3400),
      v("vivo-y3", "Y33S", 3650),
      v("vivo-y3", "Y36", 4300),
    ],
  },
  {
    id: "vivo-other",
    category: "vivo",
    title: "Tech Tonic — Vivo Y / V more",
    seriesName: "Vivo Y53 · Y81 · V9+",
    description: "Premium LCD for Vivo Y53, Y81, Y83, Y85, Y91, V9.",
    image: IMG,
    variants: [
      v("vivo-other", "Y53", 4100),
      v("vivo-other", "Y81", 3400),
      v("vivo-other", "Y83", 3200),
      v("vivo-other", "Y85", 3400),
      v("vivo-other", "Y91", 3500),
      v("vivo-other", "V9", 3400),
    ],
  },
  {
    id: "oppo-a",
    category: "oppo",
    title: "Tech Tonic — OPPO A series",
    seriesName: "OPPO A series",
    description: "Best quality replacement for OPPO A models.",
    image: IMG,
    variants: [
      v("oppo-a", "A3S", 3400),
      v("oppo-a", "A5 Black", 3200),
      v("oppo-a", "A5 White", 3200),
      v("oppo-a", "A5S", 3300),
      v("oppo-a", "A16", 3400),
      v("oppo-a", "A52", 3400),
      v("oppo-a", "A53S", 3400),
      v("oppo-a", "A54", 3450),
      v("oppo-a", "A92", 3400),
    ],
  },
  {
    id: "oppo-f",
    category: "oppo",
    title: "Tech Tonic — OPPO F series",
    seriesName: "OPPO F series",
    description: "Best quality replacement for OPPO F9, F11, F11 Pro.",
    image: IMG,
    variants: [
      v("oppo-f", "F9", 3400),
      v("oppo-f", "F11", 3400),
      v("oppo-f", "F11 Pro", 3700),
    ],
  },
  {
    id: "redmi-c-series",
    category: "xiaomi",
    title: "Tech Tonic — Redmi 9C / 12C / 13C / 14C",
    seriesName: "Redmi C series",
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
    id: "huawei-nova",
    category: "huawei",
    title: "Tech Tonic — Huawei Nova",
    seriesName: "Huawei Nova",
    description: "High-quality replacement for Nova 3i, 7i, SE.",
    image: IMG,
    variants: [
      v("huawei-nova", "Nova 3i", 3500),
      v("huawei-nova", "Nova 7i", 3500),
      v("huawei-nova", "Nova SE", 5400),
    ],
  },
  {
    id: "huawei-y",
    category: "huawei",
    title: "Tech Tonic — Huawei Y series",
    seriesName: "Huawei Y series",
    description: "High-quality replacement for Huawei Y6–Y9A.",
    image: IMG,
    variants: [
      v("huawei-y", "Y6", 3200),
      v("huawei-y", "Y7", 3400),
      v("huawei-y", "Y7A", 3400),
      v("huawei-y", "Y7 Prime", 3400),
      v("huawei-y", "Y9", 3400),
      v("huawei-y", "Y9A", 5400),
      v("huawei-y", "Y91", 5300),
    ],
  },
  {
    id: "honor",
    category: "huawei",
    title: "Tech Tonic — Honor",
    seriesName: "Honor",
    description: "High-quality replacement for Honor 8X, 8C, 10 Lite.",
    image: IMG,
    variants: [
      v("honor", "Honor 8X", 3500),
      v("honor", "Honor 8C", 3500),
      v("honor", "Honor 10 Lite", 3400),
    ],
  },
];

export type StoreModelEntry = {
  variant: StoreVariant;
  line: StoreProductLine;
  /** Model name shown in the shop (e.g. A12, 13 Pro). */
  displayName: string;
};

export function getCategoryById(id: string) {
  return STORE_CATEGORIES.find((c) => c.id === id) ?? null;
}

export function brandStoreHref(categoryId: StoreCategory) {
  return `/store/${categoryId}`;
}

export function getModelsForCategory(categoryId: StoreCategory): StoreModelEntry[] {
  const entries: StoreModelEntry[] = [];
  for (const line of STORE_PRODUCT_LINES) {
    if (line.category !== categoryId) continue;
    for (const variant of line.variants) {
      entries.push({
        variant,
        line,
        displayName: variant.label,
      });
    }
  }
  return entries.sort((a, b) =>
    a.displayName.localeCompare(b.displayName, undefined, { sensitivity: "base" }),
  );
}

export function getSeriesForCategory(categoryId: StoreCategory): StoreProductLine[] {
  return STORE_PRODUCT_LINES.filter((line) => line.category === categoryId);
}

export function modelCountForCategory(categoryId: StoreCategory): number {
  return getModelsForCategory(categoryId).length;
}

export function seriesCountForCategory(categoryId: StoreCategory): number {
  return getSeriesForCategory(categoryId).length;
}

export function minPrice(line: StoreProductLine): number {
  return Math.min(...line.variants.map((x) => x.price));
}

export function maxPrice(line: StoreProductLine): number {
  return Math.max(...line.variants.map((x) => x.price));
}

const DEFAULT_PRODUCT_IMAGE = "/featured-picks-v3.png";

export function imageForVariant(variantId: string): string {
  return findVariantById(variantId)?.line.image ?? DEFAULT_PRODUCT_IMAGE;
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

export function displayNameForVariant(
  line: StoreProductLine,
  variant: StoreVariant,
): string {
  const cat = STORE_CATEGORIES.find((c) => c.id === line.category);
  return `${cat?.label ?? "Display"} — ${variant.label}`;
}

/** Short series heading for cart groups (e.g. iPhone 11 family). */
export function seriesLabelForLine(line: StoreProductLine): string {
  if (line.seriesName?.trim()) return line.seriesName.trim();
  const cat = STORE_CATEGORIES.find((c) => c.id === line.category);
  const brand = cat?.label ?? "Panel";
  const fromTitle = line.title
    .replace(/^Tech Tonic\s*(LCD\s*)?[—–-]\s*/i, "")
    .trim();
  return fromTitle || `${brand} series`;
}

export type CartBrandModel = {
  line: StoreProductLine;
  variant: StoreVariant;
  inCart?: {
    productId: string;
    qty: number;
    price: number;
    name: string;
    image?: string;
    images?: string[];
  };
};

export type CartBrandGroup = {
  category: StoreCategory;
  label: string;
  /** All models for this brand — flat list, no series grouping */
  models: CartBrandModel[];
};

export type CartSeriesPanel = {
  line: StoreProductLine;
  variant: StoreVariant;
  inCart?: {
    productId: string;
    qty: number;
    price: number;
    name: string;
    image?: string;
    images?: string[];
  };
};

export type CartSeriesSection = {
  line: StoreProductLine;
  title: string;
  brandLabel: string;
  models: CartSeriesPanel[];
};

/**
 * For each product line with something in the cart, list every model in that
 * line only (e.g. iPhone 11 add → 11 / 11 Pro / 11 Pro Max — not iPhone 12).
 */
export function groupCartItemsBySeriesLine(
  items: {
    productId: string;
    name: string;
    price: number;
    qty: number;
    image?: string;
    images?: string[];
  }[],
): { sections: CartSeriesSection[]; orphans: typeof items } {
  const lineOrder: string[] = [];
  const lineMap = new Map<string, StoreProductLine>();
  const inCartByVariant = new Map<string, (typeof items)[number]>();
  const orphans: typeof items = [];

  for (const item of items) {
    const found = findVariantById(item.productId);
    if (!found) {
      orphans.push(item);
      continue;
    }
    if (!lineMap.has(found.line.id)) {
      lineMap.set(found.line.id, found.line);
      lineOrder.push(found.line.id);
    }
    inCartByVariant.set(item.productId, item);
  }

  const sections: CartSeriesSection[] = lineOrder.map((lineId) => {
    const line = lineMap.get(lineId)!;
    const cat = STORE_CATEGORIES.find((c) => c.id === line.category);
    return {
      line,
      title: seriesLabelForLine(line),
      brandLabel: cat?.label ?? "Panel",
      models: line.variants.map((variant) => ({
        line,
        variant,
        inCart: inCartByVariant.get(variant.id),
      })),
    };
  });

  return { sections, orphans };
}

export type CartSeriesGroup = {
  line: StoreProductLine;
  inCart: Map<string, { productId: string; qty: number; price: number; name: string; image?: string; images?: string[] }>;
};

/**
 * When any model is in the cart, show every model name for that brand
 * in one flat list (e.g. iPhone 11, 11 Pro, XR, A11… — no series headers).
 */
export function groupCartItemsByBrand(
  items: {
    productId: string;
    name: string;
    price: number;
    qty: number;
    image?: string;
    images?: string[];
  }[],
): { brands: CartBrandGroup[]; orphans: typeof items } {
  const categoriesInCart = new Set<StoreCategory>();
  const inCartByVariant = new Map<string, (typeof items)[number]>();
  const orphans: typeof items = [];

  for (const item of items) {
    const found = findVariantById(item.productId);
    if (!found) {
      orphans.push(item);
      continue;
    }
    categoriesInCart.add(found.line.category);
    inCartByVariant.set(item.productId, item);
  }

  const brands: CartBrandGroup[] = [];

  for (const cat of STORE_CATEGORIES) {
    if (!categoriesInCart.has(cat.id)) continue;

    const models: CartBrandModel[] = [];
    for (const line of STORE_PRODUCT_LINES) {
      if (line.category !== cat.id) continue;
      for (const variant of line.variants) {
        models.push({
          line,
          variant,
          inCart: inCartByVariant.get(variant.id),
        });
      }
    }

    models.sort((a, b) =>
      a.variant.label.localeCompare(b.variant.label, undefined, {
        sensitivity: "base",
        numeric: true,
      }),
    );

    brands.push({ category: cat.id, label: cat.label, models });
  }

  return { brands, orphans };
}

/** @deprecated Use groupCartItemsByBrand */
export function groupCartItemsBySeries(
  items: Parameters<typeof groupCartItemsByBrand>[0],
): { groups: CartSeriesGroup[]; orphans: typeof items } {
  const { brands, orphans } = groupCartItemsByBrand(items);
  const groups: CartSeriesGroup[] = [];
  for (const brand of brands) {
    const byLine = new Map<string, CartSeriesGroup>();
    for (const m of brand.models) {
      let g = byLine.get(m.line.id);
      if (!g) {
        g = { line: m.line, inCart: new Map() };
        byLine.set(m.line.id, g);
        groups.push(g);
      }
      if (m.inCart) g.inCart.set(m.variant.id, m.inCart);
    }
  }
  return { groups, orphans };
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
