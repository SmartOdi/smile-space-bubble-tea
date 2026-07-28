import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/context/cart";
import { formatFcfa, DEFAULT_PRODUCT_IMAGE } from "@/lib/menu";
import { WhatsAppIcon } from "./icons";
import { SHOP } from "@/lib/shop";

export function CartDrawer() {
  const { open, setOpen, items, inc, dec, remove, total, count } = useCart();

  const buildWaLink = () => {
    const lines: string[] = [];
    lines.push(`Bonjour ${SHOP.name} 🧋, je souhaite commander :`);
    lines.push("");
    for (const it of items) {
      lines.push(
        `• ${it.qty} × ${it.product.name} — ${formatFcfa(it.qty * it.product.price)}`,
      );
    }
    lines.push("");
    lines.push(`Total : ${formatFcfa(total)}`);
    lines.push("");
    lines.push("Livraison à : ");
    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${SHOP.whatsapp}?text=${text}`;
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      />
      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <div>
            <h2 className="font-display text-xl font-bold text-taro">Mon panier</h2>
            <p className="text-xs text-muted-foreground">
              {count} article{count > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-taro transition-colors hover:bg-secondary/70"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              Votre panier est vide.
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li
                  key={it.product.id}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3"
                >
                  <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-secondary/40">
                    <img
                      src={it.product.image}
                      alt={it.product.name}
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src !== DEFAULT_PRODUCT_IMAGE) img.src = DEFAULT_PRODUCT_IMAGE;
                      }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display font-bold text-taro">
                      {it.product.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatFcfa(it.product.price)}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => dec(it.product.id)}
                        className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-taro hover:bg-secondary/70"
                        aria-label="Diminuer"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{it.qty}</span>
                      <button
                        onClick={() => inc(it.product.id)}
                        className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-taro hover:bg-secondary/70"
                        aria-label="Augmenter"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => remove(it.product.id)}
                        className="ml-auto grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="font-display font-bold text-foreground">
                    {formatFcfa(it.qty * it.product.price)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border/60 bg-card px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-2xl font-bold text-taro">
                {formatFcfa(total)}
              </span>
            </div>
            <a
              href={buildWaLink()}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-semibold text-white shadow-lg shadow-[oklch(0.68_0.17_145)]/30 transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon size={22} />
              Envoyer la commande sur WhatsApp
            </a>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Vous préciserez l'adresse de livraison dans le message.
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}
