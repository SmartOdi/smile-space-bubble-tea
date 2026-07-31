import { useEffect, useRef } from "react";
import { CupIllustration } from "./icons";
import { SHOP } from "@/lib/shop";

export function Hero() {
  const liquidRef = useRef<SVGRectElement | null>(null);
  const cupWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const liquid = document.getElementById("liquid") as unknown as SVGRectElement | null;
      if (liquid) {
        const shift = Math.max(-40, -y * 0.25);
        liquid.setAttribute("y", String(170 + shift));
      }
      if (cupWrapRef.current) {
        cupWrapRef.current.style.transform = `translateY(${y * 0.05}px) rotate(${Math.sin(y / 200) * 2}deg)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 pt-8 pb-16 md:grid-cols-2 md:pt-16 md:pb-24">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-taro">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Perles fraîches cuites toutes les 2h
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-taro md:text-6xl">
            Le bubble tea qui{" "}
            <span className="relative inline-block text-primary">
              pétille
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q 50 0 100 6 T 198 4"
                  stroke="var(--mango)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            en bouche.
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
            {SHOP.tagline}. Choisissez, ajoutez au panier et envoyez votre commande sur
            WhatsApp — livrée fraîche chez vous.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-taro backdrop-blur transition-colors hover:bg-secondary"
            >
              Voir le menu
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div>
              <div className="font-display text-2xl font-bold text-taro">15+</div>
              recettes
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-taro">30 min</div>
              livraison moyenne
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-taro">4.9★</div>
              avis clients
            </div>
          </div>
        </div>

        <div ref={cupWrapRef} className="relative mx-auto w-full max-w-sm transition-transform">
          {/* Rising pearls behind cup */}
          <div className="absolute inset-0 -z-0">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="absolute h-3 w-3 rounded-full bg-taro/60 animate-rise"
                style={{
                  left: `${20 + i * 12}%`,
                  bottom: "10%",
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${5 + (i % 3)}s`,
                }}
              />
            ))}
          </div>
          <CupIllustration className="relative z-10 w-full drop-shadow-[0_25px_40px_rgba(120,53,15,0.35)]" />
        </div>
      </div>
    </section>
  );
}
