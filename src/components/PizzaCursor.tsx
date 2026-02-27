import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const CURSOR_SIZE = 56;
const HOTSPOT_OFFSET = CURSOR_SIZE / 2; // centre of image is the click point

export default function PizzaCursor() {
  // Don't render on touch / mobile devices
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) return null;

  const mouseX = useMotionValue(-CURSOR_SIZE);
  const mouseY = useMotionValue(-CURSOR_SIZE);

  const springConfig = { stiffness: 500, damping: 40, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const controls = useAnimation();
  const hasEntered = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - HOTSPOT_OFFSET);
      mouseY.set(e.clientY - HOTSPOT_OFFSET);

      // Reveal only after we have a real position
      if (!hasEntered.current) {
        hasEntered.current = true;
        controls.start({ opacity: 1 });
      }
    };

    const onLeave = () => controls.start({ opacity: 0 });
    const onEnter = (e: MouseEvent) => {
      mouseX.jump(e.clientX - HOTSPOT_OFFSET);
      mouseY.jump(e.clientY - HOTSPOT_OFFSET);
      controls.start({ opacity: 1 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter as EventListener);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter as EventListener);
    };
  }, []);

  return (
    <motion.img
      src={`${import.meta.env.BASE_URL}pizza-cutter-2.png`}
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        x,
        y,
        position: "fixed",
        top: 0,
        left: 0,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        userSelect: "none",
      }}
    />
  );
}
