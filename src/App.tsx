import { useEffect, useMemo, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";

import { PIZZAS } from "./data/pizzas";

import { wrapIndex, getDirection } from "./utils/helper";

import Background from "./components/Background/Background";
import HeroText from "./components/HeroText/HeroText";
import Ingredients from "./components/Ingredients/Ingredients";
import { PizzaArc } from "./components/PizzaArc/PizzaArc";
import { NavButtons } from "./components/NavButtons/NavButtons";

import "./App.css";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevIndexRef = useRef(activeIndex);
  const prevIndex = prevIndexRef.current;

  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  const direction = getDirection(prevIndex, activeIndex, PIZZAS.length);

  const active = useMemo(() => PIZZAS[activeIndex], [activeIndex]);

  const progress = useMotionValue(activeIndex);

  useEffect(() => {
    progress.set(activeIndex);
  }, [activeIndex, progress]);

  return (
    <div className="page">
      <div className="stage">
        {/* Background */}
        <Background activeKey={active.key} />
        {/* Hero text */}
        <HeroText title={active.title} description={active.description} />
        {/* Ingredients */}
        <Ingredients active={active} direction={direction} />
        {/* Arc */}
        <PizzaArc
          progress={progress}
          active={active}
          direction={direction}
          setIndex={setActiveIndex}
        />
        {/* Nav */}
        <NavButtons
          prev={() => setActiveIndex((i) => wrapIndex(i - 1, PIZZAS.length))}
          next={() => setActiveIndex((i) => wrapIndex(i + 1, PIZZAS.length))}
        />
      </div>
    </div>
  );
}
