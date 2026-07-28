import { MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { SHOP } from "@/lib/shop";

export function Footer() {
  return (
    <footer id="contact" className="mt-8 bg-taro text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-taro font-display text-lg">
              🧋
            </span>
            <span className="font-display text-2xl font-bold">{SHOP.name}</span>
          </div>
          <p className="mt-3 text-sm text-white/80">
            Bubble tea artisanal, perles maison, ambiance kawaii.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-display text-lg font-bold">Nous trouver</h3>
          <a
            href={SHOP.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2 text-white/90 hover:text-white"
          >
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <span>
              {SHOP.address}
              <span className="block text-xs underline">Voir sur Google Maps</span>
            </span>
          </a>
          <div className="flex items-start gap-2 text-white/90">
            <Clock className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{SHOP.hours}</span>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-display text-lg font-bold">Commander</h3>
          <a
            href={`https://wa.me/${SHOP.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 font-semibold text-white shadow-md transition-transform hover:scale-105"
          >
            <WhatsAppIcon size={20} />
            +{SHOP.whatsapp}
          </a>
          <p className="text-xs text-white/70">
            Commande directe sur WhatsApp, réponse en quelques minutes.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} {SHOP.name}. Fait avec 🧋 à Abidjan.
      </div>
    </footer>
  );
}
