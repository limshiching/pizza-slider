import { AnimatePresence, motion } from "framer-motion";

export default function HeroText({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="heroText">
      <AnimatePresence mode="wait" initial={false}>
        <motion.h1
          key={title}
          className="title"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={description}
          className="desc"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        >
          {description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
