import { Plus } from "lucide-react";
import type { Product } from "@/lib/menu";
import { formatFcfa, DEFAULT_PRODUCT_IMAGE } from "@/lib/menu";
import { useCart } from "@/context/cart";
import { useReveal } from "@/hooks/useReveal";

const badgeStyles: Record<string, string> = {
  Nouveau: "bg-taro text-white",
  "Best-seller": "bg-primary text-primary-foreground",
  "Édition limitée": "bg-mango text-taro",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  const ref = useReveal<HTMLDivElement>();
  const badgeClass = product.badge
    ? badgeStyles[product.badge] ?? "bg-secondary text-taro"
    : "";
  const flipped = index % 2 === 1;
  const backdropTones = [
    "bg-mango/25 rotate-3",
    "bg-primary/15 -rotate-2",
    "bg-taro/10 rotate-1",
    "bg-lavender/60 -rotate-3",
  ];
  const backdropClass = backdropTones[index % backdropTones.length];

  return (
    <div
      ref={ref}
      className="reveal group relative"
      style={{ transitionDelay: `${Math.min(index, 6) * 80}ms` }}
    >
      <div
        className={`absolute -inset-3 rounded-[42px] transition-transform duration-500 group-[.reveal-in]:rotate-0 ${backdropClass}`}
        aria-hidden="true"
      />
      <div
        className={`relative flex items-center gap-4 sm:gap-5 ${flipped ? "flex-row-reverse" : ""}`}
      >
        {/* Image tile */}
        <div className="relative h-48 w-36 shrink-0">
          <div className="absolute inset-0 rounded-3xl bg-card shadow-xl shadow-taro/10" />
          <div className="absolute inset-x-0 -top-1 mx-auto h-40 w-32 sm:-top-4 sm:h-52 sm:w-40">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== DEFAULT_PRODUCT_IMAGE) img.src = DEFAULT_PRODUCT_IMAGE;
              }}
              className="h-full w-full object-contain drop-shadow-[0_10px_14px_rgba(120,53,15,0.2)] transition-transform duration-500 group-[.reveal-in]:-translate-y-0.5 group-[.reveal-in]:rotate-[-1deg] sm:group-[.reveal-in]:-translate-y-1 sm:group-[.reveal-in]:rotate-[-2deg]"
            />
          </div>
          {product.badge && (
            <span
              className={`absolute -top-2 z-10 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-tight shadow-lg ${badgeClass} ${
                flipped ? "-left-2" : "-right-2"
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Text block */}
        <div className={`relative z-10 flex flex-1 flex-col ${flipped ? "text-right" : ""}`}>
          <h3 className="font-display text-lg font-bold leading-tight text-taro sm:text-xl">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs font-medium leading-snug text-taro/70 line-clamp-2 sm:text-sm">
            {product.description}
          </p>
          <div
            className={`mt-3 flex items-center justify-between ${flipped ? "flex-row-reverse" : ""}`}
          >
            <span className="font-display text-lg font-bold text-primary">
              {formatFcfa(product.price)}
            </span>
            <button
              onClick={() => add(product)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-taro text-white shadow-lg shadow-taro/30 transition-all duration-200 hover:scale-110 hover:bg-primary active:scale-90"
              aria-label={`Ajouter ${product.name} au panier`}
            >
              <Plus className="h-5 w-5" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
