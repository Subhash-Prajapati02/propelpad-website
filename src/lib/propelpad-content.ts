import brand0 from "@/assets/brands/amul.webp.asset.json";
import brand1 from "@/assets/brands/cadbury.webp.asset.json";
import brand2 from "@/assets/brands/havmor.webp.asset.json";
import brand3 from "@/assets/brands/kwality-walls.webp.asset.json";
import brand4 from "@/assets/brands/brooklyn-creamery.webp.asset.json";
import brand5 from "@/assets/brands/upside.webp.asset.json";
import brand6 from "@/assets/brands/amore.webp.asset.json";
import brand7 from "@/assets/brands/mousse-struck.webp.asset.json";
import brand8 from "@/assets/brands/white-cub.webp.asset.json";
import brand9 from "@/assets/brands/pastonji.webp.asset.json";
import brand10 from "@/assets/brands/go-zero.webp.asset.json";
import brand11 from "@/assets/brands/noto.webp.asset.json";
import brand12 from "@/assets/brands/la-cherie.webp.asset.json";

export const brands = [
  { name: "Amul", image: brand0.url },
  { name: "Cadbury", image: brand1.url },
  { name: "Havmor", image: brand2.url },
  { name: "Kwality Wall’s", image: brand3.url },
  { name: "The Brooklyn Creamery", image: brand4.url },
  { name: "Upside", image: brand5.url },
  { name: "Amore", image: brand6.url },
  { name: "Mousse Struck", image: brand7.url },
  { name: "White Cub", image: brand8.url },
  { name: "Pastonji", image: brand9.url },
  { name: "Go Zero", image: brand10.url },
  { name: "NOTO", image: brand11.url },
  { name: "La Chérie", image: brand12.url },
];

export const metrics = [
  { value: "4.4", suffix: "★", label: "Average platform rating", detail: "Across our stores on Zomato & Swiggy" },
  { value: "95", suffix: "%", label: "Order accuracy", detail: "Prepared accurately. Ready on time." },
  { value: "99.8", suffix: "%", label: "Store uptime", detail: "Open when your customers are ordering" },
  { value: "1:38", suffix: "", label: "Average prep time", detail: "From order received to ready to go" },
] as const;
export const locations = ["Dahisar", "Vakola", "Santacruz", "Chembur", "Oshiwara", "Hiranandani Estate", "Khopat (Thane West)", "Fort", "Versova"];
export const expansion = [
  { city: "Bengaluru", stores: 6, quarter: "Q2" },
  { city: "Delhi NCR", stores: 5, quarter: "Q2" },
  { city: "Hyderabad", stores: 3, quarter: "Q3" },
  { city: "Kolkata", stores: 3, quarter: "Q3" },
  { city: "Pune", stores: 2, quarter: "Q3" },
];
export const contacts = [
  { name: "Shanu Singh", role: "Mumbai City Lead", email: "shanu.singh@propelpad.in", phone: "+91 8237981485", tel: "+918237981485" },
  { name: "Gyan Menon", role: "Co-Founder", email: "gm@propelpad.in", phone: "+91 8424048334", tel: "+918424048334" },
] as const;
export const intelligence = [
  { title: "SKU performance insights", description: "Know which flavours and SKUs sell fastest, tracked per outlet and time of day.", tag: "PERFORMANCE", icon: "chart" },
  { title: "Low-velocity SKU alerts", description: "Spot slow-moving products before they approach expiry. Less waste. Smarter stock.", tag: "EARLY SIGNALS", icon: "alert" },
  { title: "Demand window mapping", description: "Weekends, evenings and seasonal peaks. Know exactly when to push each SKU.", tag: "DEMAND", icon: "clock" },
  { title: "Sell-through matching", description: "Match reorder cycles to real sales velocity, so stockouts don’t cost you a sale.", tag: "REPLENISHMENT", icon: "box" },
] as const;
export const buying = [
 { title: "Zero over-buying", detail: "Buying matched to actual sell-through, so every rupee works harder." },
 { title: "Weekly velocity cadence", detail: "Buying frequency tuned to your exact sales rhythm, SKU by SKU." },
 { title: "Seasonal forecasting", detail: "Festivals, summer peaks and weekend surges, modelled in advance." },
 { title: "Cold-chain batch sequencing", detail: "Older batches move first, without manual tracking." },
 { title: "Perfect stock depth", detail: "Maximum sales per square foot. The right stock, every day." },
];
export function composeInquiry(name: string, brand: string, email: string, message: string) {
 const body = `Hello Propelpad,\n\nI’d like to explore your white store network.\n\nName: ${name}\nBrand: ${brand}\nEmail: ${email}\n\n${message}`;
 return `mailto:${contacts[0].email}?subject=${encodeURIComponent(`White store partnership — ${brand}`)}&body=${encodeURIComponent(body)}`;
}

/**
 * Store network for the locator. Coordinates are area-level approximations
 * (precision: "area") — the deck names neighbourhoods, not street addresses.
 * Fill `address`, `hours` and `phone` when verified details are supplied.
 */
export type StoreStatus = "operational" | "planned";
export type NetworkStore = {
  id: string; name: string; area: string; city: string; state: string; status: StoreStatus;
  lat: number; lng: number; precision: "area" | "city";
  address: string | null; hours: string | null; phone: string | null; plannedStores?: number; quarter?: string;
};
const op = (id: string, area: string, city: string, lat: number, lng: number): NetworkStore => ({
  id, name: `Propelpad ${area}`, area, city, state: "Maharashtra", status: "operational", lat, lng, precision: "area", address: null, hours: null, phone: null,
});
export const networkStores: NetworkStore[] = [
  op("dahisar", "Dahisar", "Mumbai", 19.2502, 72.8597),
  op("vakola", "Vakola", "Mumbai", 19.0786, 72.8521),
  op("santacruz", "Santacruz", "Mumbai", 19.0815, 72.8411),
  op("chembur", "Chembur", "Mumbai", 19.0522, 72.9005),
  op("oshiwara", "Oshiwara", "Mumbai", 19.149, 72.834),
  op("hiranandani-estate", "Hiranandani Estate", "Thane", 19.2588, 72.9706),
  op("khopat", "Khopat (Thane West)", "Thane", 19.1924, 72.979),
  op("fort", "Fort", "Mumbai", 18.9338, 72.8355),
  op("versova", "Versova", "Mumbai", 19.131, 72.814),
  ...([
    ["bengaluru", "Bengaluru", "Karnataka", 12.9716, 77.5946],
    ["delhi-ncr", "Delhi NCR", "Delhi", 28.6139, 77.209],
    ["hyderabad", "Hyderabad", "Telangana", 17.385, 78.4867],
    ["kolkata", "Kolkata", "West Bengal", 22.5726, 88.3639],
    ["pune", "Pune", "Maharashtra", 18.5204, 73.8567],
  ] as const).map(([id, city, state, lat, lng]) => {
    const plan = expansion.find((e) => e.city === city)!;
    return { id, name: `${city} — planned`, area: city, city, state, status: "planned" as const, lat, lng, precision: "city" as const, address: null, hours: null, phone: null, plannedStores: plan.stores, quarter: plan.quarter };
  }),
];

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

export function filterStores(stores: NetworkStore[], query: string, status: "all" | StoreStatus) {
  const q = query.trim().toLowerCase();
  return stores.filter((s) => (status === "all" || s.status === status) && (!q || [s.area, s.city, s.state].some((v) => v.toLowerCase().includes(q))));
}

export function mapsLink(store: NetworkStore) {
  const q = store.address ?? `${store.area}, ${store.city}, ${store.state}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export const leadership = [
  { name: "Gyan Menon", role: "Co-Founder", initials: "GM", email: "gm@propelpad.in", phone: "+91 8424048334", tel: "+918424048334", photo: null as string | null, bio: null as string | null },
  { name: "Shanu Singh", role: "Mumbai City Lead", initials: "SS", email: "shanu.singh@propelpad.in", phone: "+91 8237981485", tel: "+918237981485", photo: null as string | null, bio: null as string | null },
];

export const onboarding = [
  { title: "Start a conversation", detail: "Tell us about your brand, your SKUs and the demand you want to reach on Zomato and Swiggy." },
  { title: "Stock the network", detail: "Your products move into category-specific, temperature-controlled storage across our white stores." },
  { title: "Fulfil every order", detail: "Orders are prepared accurately, checked in real time and handed over in moments." },
  { title: "Grow with insight", detail: "SKU performance, demand windows and sell-through data shape your next buying cycle." },
];

export const faqs = [
  { q: "What is a white store?", a: "A bright, hygienic, FSSAI-compliant and CCTV-monitored fulfilment store built around your brand — with category-specific care, predictive buying and full data transparency, unlike a generic dark store." },
  { q: "Which brands is Propelpad built for?", a: "Frozen and specialty food brands selling on Zomato and Swiggy. Today we work with 13+ brands, from heritage dairy to guilt-free indulgence." },
  { q: "Where do you operate?", a: "Nine white stores across Mumbai and Thane, with 19 new stores planned across Bengaluru, Delhi NCR, Hyderabad, Kolkata and Pune in FY26–27." },
  { q: "How do you keep frozen products fresh?", a: "Temperature-controlled, category-specific storage, cold-chain batch sequencing so older batches move first, and real-time checks before every order leaves the store." },
  { q: "What performance can I expect?", a: "Across our stores: a 4.4★ average platform rating, 95% order accuracy, 99.8% store uptime and a 1:38 average preparation time." },
  { q: "How do I get started?", a: "Use the inquiry form below or contact our Mumbai City Lead, Shanu Singh, directly by email or phone." },
];
