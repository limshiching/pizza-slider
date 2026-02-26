import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { PIZZAS } from "./data/pizzas";
import type { Pizza } from "./types/pizza.types";
import "./App.css";

const BG_BY_KEY: Record<string, string> = {
  pepperoni: "radial-gradient(circle at center, #140b0f 0%, #070708 72%)",
  spinach: "radial-gradient(circle at center, #0b1410 0%, #070708 72%)",
  "paneer-tikka": "radial-gradient(circle at center, #14100b 0%, #070708 72%)",
  margherita: "radial-gradient(circle at center, #1a0f12 0%, #070708 72%)",
  veggie: "radial-gradient(circle at center, #0f1713 0%, #070708 72%)",
  "bbq-chicken": "radial-gradient(circle at center, #14100b 0%, #070708 72%)",
  hawaiian: "radial-gradient(circle at center, #1b160a 0%, #070708 72%)",
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const active: Pizza = useMemo(() => PIZZAS[activeIndex], [activeIndex]);

  const next = () => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % PIZZAS.length);
  };

  const prev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + PIZZAS.length) % PIZZAS.length);
  };

  const progress = useMotionValue(activeIndex);
  const springProgress = useSpring(progress, { stiffness: 140, damping: 18 });

  useEffect(() => {
    progress.set(activeIndex);
  }, [activeIndex, progress]);

  const ARC_CX = 500;
  const ARC_CY = 520;
  const OUTER_R = 460;
  const INNER_R = 410;

  const dotCx = useTransform(
    springProgress,
    (i) => dotPos(i, PIZZAS.length, ARC_CX, ARC_CY, OUTER_R).x
  );
  const dotCy = useTransform(
    springProgress,
    (i) => dotPos(i, PIZZAS.length, ARC_CX, ARC_CY, OUTER_R).y
  );

  const pizzaScale = active.pizzaScale ?? 1;
  const pizzaRotateBase = active.pizzaRotate ?? 0;

  const ingScale = active.ingScale ?? 1;
  const ingY = active.ingY ?? 0;
  const ingLeftX = 0;
  const ingRightX = 0;

  const isBBQ = active.key === "bbq-chicken";
  const ingLeftRotate = isBBQ ? -70 : -20;
  const ingRightRotate = isBBQ ? 350 : 20;

  return (
    <div className="page">
      <div className="stage">
        {/* background */}
        <motion.div
          className="bg"
          aria-hidden="true"
          animate={{
            background: BG_BY_KEY[active.key] ?? BG_BY_KEY.margherita,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        <div className="heroText">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={active.title}
              className="title"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {active.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active.description}
              className="desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            >
              {active.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Ingredients */}
        <>
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={active.ingredientsImage + "-L"}
              src={active.ingredientsImage}
              alt=""
              aria-hidden="true"
              className="ingredients left"
              style={{
                x: ingLeftX,
                y: ingY,
                rotate: ingLeftRotate,
                scale: ingScale,
                opacity: 0.55,
              }}
              initial={{ opacity: 0, y: direction === 1 ? -30 : 30 }}
              animate={{ opacity: 0.55, y: ingY }}
              exit={{ opacity: 0, y: direction === 1 ? 30 : -30 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={active.ingredientsImage + "-R"}
              src={active.ingredientsImage}
              alt=""
              aria-hidden="true"
              className="ingredients right"
              style={{
                x: ingRightX,
                y: ingY,
                rotate: ingRightRotate,
                scale: ingScale,
                opacity: 0.55,
              }}
              initial={{ opacity: 0, y: direction === 1 ? -30 : 30 }}
              animate={{ opacity: 0.55, y: 0 }}
              exit={{ opacity: 0, y: direction === 1 ? 30 : -30 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
            />
          </AnimatePresence>
        </>

        {/* Arc  */}
        <div className="arcWrap" aria-hidden="true">
          <div className="arcContainer">
            <svg
              className="arcSvg"
              width="1000"
              height="520"
              viewBox="0 0 1000 520"
            >
              <path d={arcPath(ARC_CX, ARC_CY, OUTER_R)} className="ring" />
              <path d={arcPath(ARC_CX, ARC_CY, INNER_R)} className="ring" />

              <defs>
                <path id="arcTextPath" d={arcPath(ARC_CX, ARC_CY, 485)} />
              </defs>

              <text className="arcText">
                <textPath
                  href="#arcTextPath"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {PIZZAS.map((p) => p.label.toUpperCase()).join(" • ")}
                </textPath>
              </text>

              <motion.g style={{ x: dotCx, y: dotCy }}>
                <circle r="10" className="dot" />
              </motion.g>
            </svg>

            {/* Pizza */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={active.pizzaImage}
                src={active.pizzaImage}
                alt={active.title}
                className="pizza"
                style={{
                  x: "-50%",
                  y: "-50%",
                }}
                initial={{
                  opacity: 0,
                  rotate: pizzaRotateBase + (direction === 1 ? -10 : 10),
                  scale: pizzaScale * 0.98,
                }}
                animate={{
                  opacity: 1,
                  rotate: pizzaRotateBase,
                  scale: pizzaScale,
                }}
                exit={{
                  opacity: 0,
                  rotate: pizzaRotateBase + (direction === 1 ? 10 : -10),
                  scale: pizzaScale * 0.98,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                draggable={false}
              />
            </AnimatePresence>
          </div>
        </div>

        <button className="navBtn leftBtn" onClick={prev} aria-label="Previous">
          ‹
        </button>
        <button className="navBtn rightBtn" onClick={next} aria-label="Next">
          ›
        </button>
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function arcPath(cx: number, cy: number, r: number): string {
  const startX = cx - r;
  const startY = cy;
  const endX = cx + r;
  const endY = cy;
  return `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`;
}

function dotPos(
  index: number,
  total: number,
  cx: number,
  cy: number,
  r: number
): { x: number; y: number } {
  if (total <= 1) return { x: cx, y: cy - r };

  const i = clamp(index, 0, total - 1);
  const t = total === 1 ? 0 : i / (total - 1);

  const start = (200 * Math.PI) / 180;
  const end = (340 * Math.PI) / 180;

  const angle = start + (end - start) * t;

  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}
