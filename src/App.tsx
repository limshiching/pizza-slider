import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { PIZZAS } from "./data/pizzas";
import type { Pizza } from "./types/pizza.types";

import { ARC, arcPath, dotPos } from "./utils/arc";
import { wrapIndex, getDirection } from "./utils/helper";
import PizzaCursor from "./components/PizzaCursor";

import "./App.css";

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

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevIndexRef = useRef(activeIndex);
  const prevIndex = prevIndexRef.current;

  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  const direction = getDirection(prevIndex, activeIndex, PIZZAS.length);

  const active = useMemo(() => PIZZAS[activeIndex], [activeIndex]);

  const next = () => setActiveIndex((i) => wrapIndex(i + 1, PIZZAS.length));
  const prev = () => setActiveIndex((i) => wrapIndex(i - 1, PIZZAS.length));

  const progress = useMotionValue(activeIndex);
  const springProgress = useSpring(progress, { stiffness: 140, damping: 18 });

  useEffect(() => {
    progress.set(activeIndex);
  }, [activeIndex, progress]);

  const dotX = useTransform(
    springProgress,
    (i) => dotPos(i, PIZZAS.length, ARC.cx, ARC.cy, ARC.outerR).x
  );
  const dotY = useTransform(
    springProgress,
    (i) => dotPos(i, PIZZAS.length, ARC.cx, ARC.cy, ARC.outerR).y
  );

  const pizzaScale = active.pizzaScale ?? 1;
  const pizzaRotateBase = active.pizzaRotate ?? 0;

  const ingScale = active.ingScale ?? 1;
  const ingY = active.ingY ?? 0;

  const ingLeftRotate = active.ingRotate?.left ?? -20;
  const ingRightRotate = active.ingRotate?.right ?? 20;

  const bg = BG_BY_KEY[active.key] ?? DEFAULT_BG;

  return (
    <div className="page">
      <PizzaCursor />
      <div className="stage">
        {/* Background */}
        <motion.div
          className="bg"
          aria-hidden="true"
          animate={{ background: bg }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Hero text */}
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
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={`${active.ingredientsImage}-L`}
            src={active.ingredientsImage}
            alt=""
            aria-hidden="true"
            className="ingredients left"
            style={{
              x: 0,
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
            key={`${active.ingredientsImage}-R`}
            src={active.ingredientsImage}
            alt=""
            aria-hidden="true"
            className="ingredients right"
            style={{
              x: 0,
              y: ingY,
              rotate: ingRightRotate,
              scale: ingScale,
              opacity: 0.55,
            }}
            initial={{ opacity: 0, y: direction === 1 ? -30 : 30 }}
            animate={{ opacity: 0.55, y: ingY }}
            exit={{ opacity: 0, y: direction === 1 ? 30 : -30 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          />
        </AnimatePresence>

        {/* Arc */}
        <div className="arcWrap" aria-hidden="true">
          <div className="arcContainer">
            <svg
              className="arcSvg"
              width={ARC.svgW}
              height={ARC.svgH}
              viewBox={`0 0 ${ARC.svgW} ${ARC.svgH}`}
            >
              <path d={arcPath(ARC.cx, ARC.cy, ARC.outerR)} className="ring" />
              <path d={arcPath(ARC.cx, ARC.cy, ARC.innerR)} className="ring" />

              <defs>
                <path id="arcTextPath" d={arcPath(ARC.cx, ARC.cy, ARC.textR)} />
              </defs>

              <text className="arcText">
                <textPath
                  href="#arcTextPath"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {ARC_LABELS}
                </textPath>
              </text>

              <motion.g style={{ x: dotX, y: dotY }}>
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
                style={{ x: "-50%", y: "-50%" }}
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

        {/* Nav */}
        <button className="navBtn leftBtn" onClick={prev} aria-label="Previous">
          ‹
        </button>
        <button className="navBtn rightBtn" onClick={next} aria-label="Next">
          ›
        </button>

        <div className="mobileDots" aria-hidden="true">
          {PIZZAS.map((_, i) => (
            <span
              key={i}
              className={`dot-indicator ${i === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const ARC_LABELS = PIZZAS.map((p) => p.label.toUpperCase()).join(" • ");
