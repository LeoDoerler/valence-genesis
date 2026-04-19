import synthesisImg from "@/assets/synthesis-tee.jpg";
import meridianImg from "@/assets/meridian-tee.jpg";
import blueprintImg from "@/assets/blueprint-tee.jpg";
import signalImg from "@/assets/signal-hoodie.jpg";
import shakerImg from "@/assets/shaker-cup.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  hasSizes: boolean;
  description: string;
  fabric: { gsm: string; composition: string; fit: string };
  molecular: { compound: string; role: string };
};

export const products: Product[] = [
  {
    slug: "synthesis-tee",
    name: "Synthesis Tee",
    price: 65,
    image: synthesisImg,
    hoverImage: blueprintImg,
    hasSizes: true,
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
    hoverImage: synthesisImg,
    hasSizes: true,
    description:
      "L-Citrulline structure. Same fabric. Slightly more relaxed fit than the Synthesis.",
    fabric: { gsm: "240", composition: "65% combed cotton / 35% polyester", fit: "Relaxed straight" },
    molecular: {
      compound: "L-Citrulline — non-essential amino acid",
      role: "Converts to L-arginine in the kidneys. Elevates plasma arginine more efficiently than oral arginine. Substrate for endothelial nitric oxide synthase. Increases vasodilation.",
    },
  },
  {
    slug: "blueprint-tee",
    name: "Blueprint Tee",
    price: 65,
    image: blueprintImg,
    hoverImage: meridianImg,
    hasSizes: true,
    description:
      "Sarcomere diagram. For the lifter who understands mechanical tension.",
    fabric: { gsm: "240", composition: "65% combed cotton / 35% polyester", fit: "Controlled taper" },
    molecular: {
      compound: "Sarcomere — contractile unit of striated muscle",
      role: "Z-disc to Z-disc. Actin and myosin filaments slide under cross-bridge cycling. Mechanical tension at the sarcomere level is the primary driver of hypertrophic signaling via mTOR.",
    },
  },
  {
    slug: "signal-hoodie",
    name: "Signal Hoodie",
    price: 90,
    image: signalImg,
    hoverImage: synthesisImg,
    hasSizes: true,
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
    hoverImage: shakerImg,
    hasSizes: false,
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
