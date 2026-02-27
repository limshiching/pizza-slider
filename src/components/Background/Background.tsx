import { motion } from "framer-motion";
import type { Pizza } from "../../types/pizza.types";

const BG_BY_KEY: Record<Pizza["key"], string> = {
  pepperoni: "radial-gradient(circle at center, #140b0f 0%, #070708 72%)",
  spinach: "radial-gradient(circle at center, #0b1410 0%, #070708 72%)",
  "paneer-tikka": "radial-gradient(circle at center, #14100b 0%, #070708 72%)",
  margherita: "radial-gradient(circle at center, #1a0f12 0%, #070708 72%)",
  veggie: "radial-gradient(circle at center, #0f1713 0%, #070708 72%)",
  "bbq-chicken": "radial-gradient(circle at center, #14100b 0%, #070708 72%)",
  hawaiian: "radial-gradient(circle at center, #1b160a 0%, #070708 72%)",
} as const;

const DEFAULT_BG = BG_BY_KEY.margherita;

export default function Background({ activeKey }: { activeKey: string }) {
  const bg = BG_BY_KEY[activeKey] ?? DEFAULT_BG;
  return (
    <motion.div
      className="bg"
      aria-hidden="true"
      animate={{ background: bg }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  );
}
