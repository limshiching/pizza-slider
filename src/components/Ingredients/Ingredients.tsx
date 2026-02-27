import { AnimatePresence, motion } from "framer-motion";
import type { Pizza } from "../../types/pizza.types";

export default function Ingredients({
  active,
  direction,
}: {
  active: Pizza;
  direction: 1 | -1;
}) {
  const ingScale = active.ingScale ?? 1;
  const ingY = active.ingY ?? 0;

  const ingLeftRotate = active.ingRotate?.left ?? -20;
  const ingRightRotate = active.ingRotate?.right ?? 20;

  return (
    <>
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
    </>
  );
}
