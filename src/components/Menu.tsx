import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { useMenu } from "@/context/menu";
import { useEffect, useMemo, useRef, useState } from "react";

export function Menu() {
  const { products, menuTypes, loading, error } = useMenu();
  const [activeType, setActiveType] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("Tout");
  const menuSectionRef = useRef<HTMLElement>(null);

  // Sélectionne le premier type de menu dès que les données arrivent
  useEffect(() => {
    if (menuTypes.length > 0 && !menuTypes.includes(activeType)) {
      setActiveType(menuTypes[0]);
      setActiveCategory("Tout");
    }
  }, [menuTypes, activeType]);

  const productsForType = useMemo(
    () => products.filter((p) => p.menuType === activeType),
    [products, activeType],
  );

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const p of productsForType) {
      if (p.category && !seen.has(p.category)) {
        seen.add(p.category);
        out.push(p.category);
      }
    }
    return out;
  }, [productsForType]);

  const catTabs = ["Tout", ...categories];
  const currentCat = catTabs.includes(activeCategory) ? activeCategory : "Tout";
  const list =
    currentCat === "Tout"
      ? productsForType
      : productsForType.filter((p) => p.category === currentCat);

  return (
    <section id="menu" ref={menuSectionRef} className="relative py-16 md:py-24">
      {/* Décor perles flottantes locales */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="absolute left-6 top-24 h-6 w-6 rounded-full bg-taro/10 animate-float-slow" />
        <span
          className="absolute right-10 top-64 h-9 w-9 rounded-full bg-taro/5 animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        <span
          className="absolute left-1/4 top-[420px] h-10 w-10 rounded-full bg-mango/25 animate-float-slow"
          style={{ animationDelay: "4s" }}
        />
        <span
          className="absolute right-1/4 bottom-40 h-5 w-5 rounded-full bg-primary/15 animate-float-slow"
          style={{ animationDelay: "1s" }}
        />
        <span
          className="absolute left-16 bottom-24 h-7 w-7 rounded-full bg-lavender/60 animate-float-slow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4">
        <div className="mb-6 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Notre menu
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-taro md:text-5xl">
            Choisis ta bulle du jour
          </h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span
              className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
              aria-label="Chargement"
            />
            <p className="mt-4 text-sm text-muted-foreground">Chargement du menu…</p>
          </div>
        ) : error ? (
          <div className="mx-auto max-w-md rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
            <p className="font-semibold text-destructive">{error}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Vérifiez votre connexion ou réessayez plus tard.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">Aucun produit disponible.</div>
        ) : (
          <>
            {/* Onglets type de menu (niveau 1) */}
            {menuTypes.length > 1 && (
              <div className="mb-4 flex justify-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {menuTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setActiveType(t);
                      setActiveCategory("Tout");
                    }}
                    className={`shrink-0 rounded-full border-2 px-5 py-2 text-sm font-bold outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                      activeType === t
                        ? "border-taro bg-taro text-white shadow-md"
                        : "border-taro/20 bg-transparent text-taro hover:bg-taro/5"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {/* Onglets catégorie (niveau 2, glassmorphism sticky) */}
            <div className="sticky top-16 z-20 -mx-4 mb-10 px-4">
              <div className="rounded-3xl border border-white/50 bg-background/60 px-3 py-3 shadow-lg shadow-taro/5 backdrop-blur-xl">
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {catTabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setActiveCategory(t);
                        menuSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                        currentCat === t
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "border border-taro/10 bg-card/70 text-taro hover:bg-secondary"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Liste dynamique */}
            <div className="space-y-10 pt-4">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}