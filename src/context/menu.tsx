import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { fetchMenu, type Product } from "@/lib/menu";

type MenuCtx = {
  products: Product[];
  menuTypes: string[];
  loading: boolean;
  error: string | null;
  reload: () => void;
};

const Ctx = createContext<MenuCtx | null>(null);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetchMenu(ctrl.signal)
      .then((list) => {
        setProducts(list.filter((p) => p.available));
        setLoading(false);
      })
      .catch((e: unknown) => {
        if ((e as { name?: string })?.name === "AbortError") return;
        console.error("Chargement du menu échoué", e);
        setError("Impossible de charger le menu pour le moment.");
        setLoading(false);
      });
    return () => ctrl.abort();
  }, [nonce]);

  const menuTypes = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const p of products) {
      if (p.menuType && !seen.has(p.menuType)) {
        seen.add(p.menuType);
        out.push(p.menuType);
      }
    }
    return out;
  }, [products]);

  return (
    <Ctx.Provider
      value={{ products, menuTypes, loading, error, reload: () => setNonce((n) => n + 1) }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useMenu() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useMenu outside MenuProvider");
  return c;
}