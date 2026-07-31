import { Star } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const REVIEWS = [
  {
    name: "Awa K.",
    text: "Le Taro est une tuerie ! Les perles sont parfaitement cuites, ni trop molles ni trop dures.",
    stars: 5,
    initial: "A",
    color: "var(--taro)",
  },
  {
    name: "Yannick M.",
    text: "Commande sur WhatsApp super rapide, livré en 25 min. Le Brown Sugar est devenu mon addiction 😅",
    stars: 5,
    initial: "Y",
    color: "var(--fuchsia-pop)",
  },
  {
    name: "Fatou D.",
    text: "Enfin un vrai bubble tea à Cotonou ! Le Ice Coffee sent trop bon, j'y retourne cette semaine.",
    stars: 5,
    initial: "F",
    color: "var(--mango)",
  },
  {
    name: "Kevin O.",
    text: "Packaging trop mignon, goût au top. Le Matcha Latte est équilibré, pas amer. Bravo l'équipe.",
    stars: 4,
    initial: "K",
    color: "var(--taro)",
  },
];

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal rounded-3xl border border-border/60 bg-card p-5 shadow-sm"
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4"
            fill={i < r.stars ? "var(--mango)" : "transparent"}
            color="var(--mango)"
          />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground">"{r.text}"</p>
      <div className="mt-4 flex items-center gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-full font-display text-lg font-bold text-white"
          style={{ background: r.color }}
        >
          {r.initial}
        </span>
        <span className="text-sm font-semibold text-taro">{r.name}</span>
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section id="avis" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Avis</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-taro md:text-5xl">
            Ils sont tombés dans la bulle
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
