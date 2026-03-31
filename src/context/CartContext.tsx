"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  setQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

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
              qty: q,
            },
          ];
        }
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + q };
        return next;
      });
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

  const value = useMemo(
    () => ({ items, addItem, setQty, removeItem, clear }),
    [items, addItem, setQty, removeItem, clear],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
