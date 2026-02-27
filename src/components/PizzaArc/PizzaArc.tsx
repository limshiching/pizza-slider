import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";

import { ARC, arcPath, dotPos, arcSegmentByAngle } from "../../utils/arc";
import { PIZZAS } from "../../data/pizzas";
import type { Pizza } from "../../types/pizza.types";

export function PizzaArc({
  progress,
  active,
  direction,
  setIndex,
}: {
  progress: MotionValue<number>;
  active: Pizza;
  direction: 1 | -1;
  setIndex: (i: number) => void;
}) {
  const ARC_LABELS = PIZZAS.map((p) => p.label.toUpperCase()).join(" • ");

  const springProgress = useSpring(progress, { stiffness: 140, damping: 18 });
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

  return (
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
            <textPath href="#arcTextPath" startOffset="50%" textAnchor="middle">
              {ARC_LABELS}
            </textPath>
          </text>

          {PIZZAS.map((pizza, i) => {
            const n = PIZZAS.length;

            const p = dotPos(i, n, ARC.cx, ARC.cy, ARC.textR);

            const centerAngle = Math.atan2(p.y - ARC.cy, p.x - ARC.cx);

            // Choose how wide each clickable segment should be.
            // If labels overlap, make this a bit smaller.
            const halfAngle = ((Math.PI * 2) / n) * 0.45;

            return (
              <path
                key={pizza.key}
                d={arcSegmentByAngle(
                  ARC.cx,
                  ARC.cy,
                  ARC.textR,
                  centerAngle,
                  halfAngle
                )}
                fill="none"
                stroke="transparent"
                strokeWidth={46}
                style={{ cursor: "pointer" }}
                onClick={() => setIndex(i)}
              />
            );
          })}

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
            transition={{ duration: 0.4, ease: "easeOut" }}
            draggable={false}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
