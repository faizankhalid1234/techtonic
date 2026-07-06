"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CartDrawer } from "@/components/CartDrawer";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  /** Panel gallery shots for cart / checkout */
  images?: string[];
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  setQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  replaceWithItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addItem = useCallback(
    (item: Omit<CartItem, "qty"> & { qty?: number }) => {
      setItems((prev) => {
        const q = item.qty ?? 1;
        const i = prev.findIndex((x) => x.productId === item.productId);
        if (i === -1) {
          return [
            ...prev,
            {
              productId: item.productId,
              name: item.name,
              price: item.price,
              image: item.image,
              images: item.images,
              qty: q,
            },
          ];
        }
        const next = [...prev];
        next[i] = {
          ...next[i],
          qty: next[i].qty + q,
          image: item.image ?? next[i].image,
          images: item.images ?? next[i].images,
        };
        return next;
      });
      setDrawerOpen(true);
    },
    [],
  );

  const setQty = useCallback((productId: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((x) =>
          x.productId === productId ? { ...x, qty: Math.max(1, qty) } : x,
        )
        .filter((x) => x.qty > 0),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((x) => x.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const replaceWithItem = useCallback(
    (item: Omit<CartItem, "qty"> & { qty?: number }) => {
      setItems([
        {
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          images: item.images,
          qty: item.qty ?? 1,
        },
      ]);
    },
    [],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      drawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      setQty,
      removeItem,
      clear,
      replaceWithItem,
    }),
    [
      items,
      itemCount,
      drawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      setQty,
      removeItem,
      clear,
      replaceWithItem,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        items={items}
        itemCount={itemCount}
        setQty={setQty}
        removeItem={removeItem}
        addItem={addItem}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
