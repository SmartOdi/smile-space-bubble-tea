import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useMenu } from "@/context/menu";

export function Menu() {
  const { products, categories, loading, error } = useMenu();
  const [active, setActive] = useState<string>("Tout");

  const tabs = ["Tout", ...categories];
  const currentTab = tabs.includes(active) ? active : "Tout";
  const list =
    currentTab === "Tout" ? products : products.filter((p) => p.category === currentTab);

  return (
    <section id="menu" className="relative py-16 md:py-24">
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
            {/* Onglets sticky glassmorphism */}
            <div className="sticky top-16 z-20 -mx-4 mb-10 px-4">
              <div className="rounded-3xl border border-white/50 bg-background/60 px-3 py-3 shadow-lg shadow-taro/5 backdrop-blur-xl">
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActive(t)}
                      className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 ${
                        currentTab === t
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

            {categories.map((c) => (
              <div key={c} id={`menu-${c}`} className="scroll-mt-32" />
            ))}

            {/* Liste dynamique alternée */}
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
