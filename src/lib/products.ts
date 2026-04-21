import synthesisImg from "@/assets/synthesis-tee.png";
import meridianImg from "@/assets/meridian-tee.png";
import signalImg from "@/assets/signal-hoodie.png";
import shakerImg from "@/assets/shaker-cup.png";

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  hasSizes: boolean;
  description: string;
  altText: string;
  fabric: { gsm: string; composition: string; fit: string };
  molecular: { compound: string; role: string };
};

export const products: Product[] = [
  {
    slug: "synthesis-tee",
    name: "Synthesis Tee",
    price: 65,
    image: synthesisImg,

    hasSizes: true,
    altText: "Synthesis Tee — black tee with caffeine molecular structures on both sleeves and V logo on chest",
    description:
      "Caffeine molecule graphic. 240gsm cotton-poly blend. Controlled taper cut.",
    fabric: { gsm: "240", composition: "65% combed cotton / 35% polyester", fit: "Controlled taper" },
    molecular: {
      compound: "Caffeine — 1,3,7-trimethylxanthine",
      role: "Adenosine receptor antagonist. Blocks fatigue signaling at the A1 and A2A receptors. Increases catecholamine output. Half-life: 5 hours.",
    },
  },
  {
    slug: "meridian-tee",
    name: "Meridian Tee",
    price: 65,
    image: meridianImg,

    hasSizes: true,
    altText: "Meridian Tee — black tee with L-citrulline molecular structure running down the left side and V logo on chest",
    description:
      "L-Citrulline structure. Same fabric. Slightly more relaxed fit than the Synthesis.",
    fabric: { gsm: "240", composition: "65% combed cotton / 35% polyester", fit: "Relaxed straight" },
    molecular: {
      compound: "L-Citrulline — non-essential amino acid",
      role: "Converts to L-arginine in the kidneys. Elevates plasma arginine more efficiently than oral arginine. Substrate for endothelial nitric oxide synthase. Increases vasodilation.",
    },
  },
  {
    slug: "signal-hoodie",
    name: "Signal Hoodie",
    price: 90,
    image: signalImg,

    hasSizes: true,
    altText: "Signal Hoodie — black hoodie with mirrored testosterone molecular structures across the chest",
    description:
      "Testosterone molecular structure. Heavyweight structured hoodie.",
    fabric: { gsm: "440", composition: "80% cotton / 20% polyester fleece", fit: "Structured oversized" },
    molecular: {
      compound: "Testosterone — C₁₉H₂₈O₂",
      role: "Endogenous androgen. Binds the androgen receptor. Upregulates myofibrillar protein synthesis and satellite cell activity. Suppresses myostatin expression.",
    },
  },
  {
    slug: "delivery-system-shaker",
    name: "Delivery System Shaker Cup",
    price: 35,
    image: shakerImg,

    hasSizes: false,
    altText: "Delivery System Shaker Cup — black shaker with large V logo and molecular structures printed on the body",
    description:
      "No size variants. One color: black. The delivery system for everything else.",
    fabric: { gsm: "—", composition: "BPA-free copolyester / stainless mixing coil", fit: "750ml capacity" },
    molecular: {
      compound: "Vehicle — solvent + agitation",
      role: "Mechanical agitation reduces particulate clumping. Suspension homogeneity improves absorption kinetics for powdered substrates.",
    },
  },
];

export const SHIPPING_FLAT = 5.99;
export const FREE_SHIPPING_THRESHOLD = 80;
export const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
