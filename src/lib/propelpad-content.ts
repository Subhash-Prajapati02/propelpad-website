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
  { city: "Bangalore", stores: 6, quarter: "Q2" },
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
