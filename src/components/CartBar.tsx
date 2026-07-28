import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart";
import { formatFcfa } from "@/lib/products";

export function CartBar() {
  const { count, total, setOpen } = useCart();
  if (count === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <button
        onClick={() => setOpen(true)}
        className="pointer-events-auto flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-primary-foreground shadow-2xl shadow-primary/40 transition-transform hover:scale-105 animate-fade-in"
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/20">
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-mango text-[11px] font-bold text-[oklch(0.25_0.06_40)]">
            {count}
          </span>
        </span>
        <span className="font-semibold">Commander maintenant</span>
        <span className="hidden xs:inline font-display text-lg font-bold">
          {formatFcfa(total)}
        </span>
      </button>
    </div>
  );
}
