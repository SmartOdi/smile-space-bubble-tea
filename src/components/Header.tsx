import { ShoppingBag } from "lucide-react";
import { SHOP } from "@/lib/shop";
import { useCart } from "@/context/cart";
import { useMenu } from "@/context/menu";
import logo from "@/assets/logo.png";

export function Header() {
  const { count, setOpen } = useCart();
  const { menuTypes } = useMenu();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt={SHOP.name}
            className="h-10 w-10 rounded-2xl object-cover shadow-md"
          />
          <span className="font-display text-xl font-bold text-taro">{SHOP.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {menuTypes.map((c) => (
            <a
              key={c}
              href="#menu"
              className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-taro"
            >
              {c}
            </a>
          ))}
          <a
            href="#avis"
            className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-taro"
          >
            Avis
          </a>
          <a
            href="#contact"
            className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-taro"
          >
            Contact
          </a>
        </nav>
        <button
          onClick={() => setOpen(true)}
          className="relative rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105"
          aria-label="Ouvrir le panier"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Panier</span>
          </span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-mango text-[11px] font-bold text-[oklch(0.25_0.06_40)]">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
