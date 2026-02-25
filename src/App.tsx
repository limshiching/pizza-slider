import { useMemo, useState } from "react";
import { PIZZAS } from "./data/pizzas";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = useMemo(() => PIZZAS[activeIndex], [activeIndex]);

  const next = () => setActiveIndex((i) => (i + 1) % PIZZAS.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + PIZZAS.length) % PIZZAS.length);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.stage}>
          <div style={styles.heroText}>
            <div style={styles.label}>{active.label}</div>
            <h1 style={styles.title}>{active.title}</h1>
            <p style={styles.desc}>{active.description}</p>

            <div style={styles.controls}>
              <button style={styles.button} onClick={prev}>
                Prev
              </button>
              <button style={styles.button} onClick={next}>
                Next
              </button>
            </div>
          </div>

          {/* Ingredients (top corners) */}
          <img
            src={active.ingredientsImage}
            alt=""
            aria-hidden="true"
            style={{ ...styles.ingredients, ...styles.ingredientsLeft }}
          />
          <img
            src={active.ingredientsImage}
            alt=""
            aria-hidden="true"
            style={{ ...styles.ingredients, ...styles.ingredientsRight }}
          />

          {/* Pizza */}
          <img
            src={active.pizzaImage}
            alt={active.title}
            style={styles.pizza}
          />
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0b0b0b",
    color: "#fff",
    display: "block",
    placeItems: "center",
    padding: "24px 24px 0",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
  container: {
    width: "min(1100px, 100%)",
  },
  heroText: {
    position: "absolute",
    top: 80,
    left: "50%",
    transform: "translateX(-50%)",
    width: "min(760px, 92%)",
    textAlign: "center",
    zIndex: 3,
  },
  label: {
    letterSpacing: 2,
    opacity: 0.75,
    fontSize: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 48,
    lineHeight: 1.05,
    margin: "0 0 14px 0",
  },
  desc: {
    margin: "0 auto",
    maxWidth: 620,
    opacity: 0.82,
    lineHeight: 1.6,
    fontSize: 16,
  },
  controls: {
    display: "flex",
    gap: 12,
    marginTop: 18,
    justifyContent: "center",
  },
  button: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
  },
  stage: {
    position: "relative",
    height: "90vh",
    borderRadius: 24,
    overflow: "hidden",
    background: "radial-gradient(circle at center, #121212 0%, #0b0b0b 65%)",
  },
  ingredients: {
    position: "absolute",
    width: 300,
    opacity: 0.85,
    pointerEvents: "none",
    userSelect: "none",
    filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.35))",
    zIndex: 1,
  },
  ingredientsRight: { right: 0, transform: "scaleX(-1)" },
  pizza: {
    position: "absolute",
    left: "50%",
    bottom: -400,
    width: 800,
    transform: "translateX(-50%)",
    pointerEvents: "none",
  },
};
