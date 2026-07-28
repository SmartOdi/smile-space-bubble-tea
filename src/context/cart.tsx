import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";

export type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = (p: Product) =>
    setItems((prev) => {
      const f = prev.find((i) => i.product.id === p.id);
      if (f) return prev.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { product: p, qty: 1 }];
    });
  const inc = (id: string) =>
    setItems((p) => p.map((i) => (i.product.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const dec = (id: string) =>
    setItems((p) =>
      p
        .map((i) => (i.product.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );
  const remove = (id: string) => setItems((p) => p.filter((i) => i.product.id !== id));
  const clear = () => setItems([]);

  const { count, total } = useMemo(() => {
    let c = 0;
    let t = 0;
    for (const it of items) {
      c += it.qty;
      t += it.qty * it.product.price;
    }
    return { count: c, total: t };
  }, [items]);

  return (
    <Ctx.Provider value={{ items, add, inc, dec, remove, clear, count, total, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
