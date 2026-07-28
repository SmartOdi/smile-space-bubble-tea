// Chargement dynamique du menu depuis Google Sheets (CSV publié)
//
// Pour brancher votre feuille :
// 1. Dans Google Sheets : Fichier → Partager → Publier sur le Web
// 2. Choisir l'onglet "menu" et le format "Valeurs séparées par des virgules (.csv)"
// 3. Copier l'URL générée et la coller ci-dessous.
//
// Colonnes attendues : Nom, Categorie, Description, Prix, Image, Badge, Disponible
export const MENU_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/REMPLACER_PAR_VOTRE_ID/pub?gid=0&single=true&output=csv";

export const DEFAULT_PRODUCT_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 240'>
      <defs><linearGradient id='g' x1='0' x2='0' y1='0' y2='1'>
        <stop offset='0' stop-color='#fde68a'/><stop offset='1' stop-color='#f97316'/>
      </linearGradient></defs>
      <rect width='200' height='240' fill='#fffbf0'/>
      <path d='M50 70 h100 l-14 150 a10 10 0 0 1 -10 9 h-52 a10 10 0 0 1 -10 -9 z' fill='url(#g)'/>
      <ellipse cx='100' cy='70' rx='50' ry='10' fill='#fff' opacity='0.6'/>
      <circle cx='85' cy='200' r='6' fill='#4a2c18'/>
      <circle cx='105' cy='210' r='6' fill='#4a2c18'/>
      <circle cx='120' cy='198' r='6' fill='#4a2c18'/>
      <text x='100' y='40' text-anchor='middle' font-family='sans-serif' font-size='16' fill='#92400e'>🧋</text>
    </svg>`,
  );

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // FCFA
  category: string;
  badge?: string;
  image: string;
  available: boolean;
};

export const formatFcfa = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;

// ---------- Parseur CSV maison (guillemets, virgules dans les champs, retours à la ligne) ----------
export function parseCSV(text: string): string[][] {
  // Retire un éventuel BOM
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let i = 0;
  let inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }
    field += c;
    i++;
  }
  // Flush final
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  // Retire les lignes entièrement vides
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

// ---------- Nettoyeurs de valeurs ----------
export function parsePrice(raw: string): number {
  if (!raw) return 0;
  // Supprime tout ce qui n'est ni un chiffre ni un séparateur décimal
  const cleaned = raw
    .replace(/\u00a0/g, " ")
    .replace(/[^\d.,-]/g, "")
    .replace(/\s+/g, "")
    .replace(/,(?=\d{3}\b)/g, "") // 2,500 -> 2500
    .replace(",", ".");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

export function parseAvailable(raw: string | undefined): boolean {
  if (raw === undefined) return true;
  const v = raw.trim().toLowerCase();
  if (v === "") return true;
  if (["non", "no", "false", "0", "faux", "n"].includes(v)) return false;
  return true;
}

function isValidImageUrl(raw: string): boolean {
  if (!raw) return false;
  const v = raw.trim();
  if (!v) return false;
  return /^https?:\/\//i.test(v) || v.startsWith("data:image/") || v.startsWith("/");
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeHeader(h: string): string {
  return h
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const HEADER_ALIASES: Record<string, string> = {
  nom: "name",
  name: "name",
  produit: "name",
  categorie: "category",
  category: "category",
  description: "description",
  desc: "description",
  prix: "price",
  price: "price",
  image: "image",
  photo: "image",
  badge: "badge",
  disponible: "available",
  available: "available",
};

export function rowsToProducts(rows: string[][]): Product[] {
  if (rows.length < 2) return [];
  const header = rows[0].map(normalizeHeader);
  const idx: Record<string, number> = {};
  header.forEach((h, i) => {
    const key = HEADER_ALIASES[h];
    if (key && idx[key] === undefined) idx[key] = i;
  });
  const get = (row: string[], key: string) =>
    idx[key] !== undefined ? (row[idx[key]] ?? "").trim() : "";

  const products: Product[] = [];
  const seen = new Map<string, number>();
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const name = get(row, "name");
    if (!name) continue;
    const rawImage = get(row, "image");
    let id = slugify(name);
    const n = (seen.get(id) ?? 0) + 1;
    seen.set(id, n);
    if (n > 1) id = `${id}-${n}`;
    products.push({
      id,
      name,
      description: get(row, "description"),
      price: parsePrice(get(row, "price")),
      category: get(row, "category") || "Autres",
      badge: get(row, "badge") || undefined,
      image: isValidImageUrl(rawImage) ? rawImage : DEFAULT_PRODUCT_IMAGE,
      available: parseAvailable(get(row, "available")),
    });
  }
  return products;
}

export async function fetchMenu(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(MENU_CSV_URL, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return rowsToProducts(parseCSV(text));
}
