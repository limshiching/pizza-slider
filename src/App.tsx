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

          {/* Arc indicator */}
          <div style={styles.arcWrap} aria-hidden="true">
            <svg
              width="1000"
              height="520"
              viewBox="0 0 1000 520"
              style={styles.arcSvg}
            >
              <path d={arcPath(500, 520, 460)} style={styles.ringOuter} />
              <path d={arcPath(500, 520, 410)} style={styles.ringInner} />

              <defs>
                <path id="pizzaArcTextPath" d={arcPath(500, 520, 485)} />
              </defs>

              <text style={styles.arcText}>
                <textPath
                  href="#pizzaArcTextPath"
                  startOffset="50%"
                  textAnchor="middle"
                  method="align"
                  spacing="auto"
                >
                  {[...PIZZAS].map((p) => p.label).join(" • ")}
                </textPath>
              </text>

              {/* Moving indicator dot on outer ring */}
              <circle
                r="10"
                cx={dotPos(activeIndex, PIZZAS.length, 500, 520, 460).x}
                cy={dotPos(activeIndex, PIZZAS.length, 500, 520, 460).y}
                style={styles.arcDot}
              />
            </svg>
          </div>

          {/* Pizza */}
          <img
            src={active.pizzaImage}
            alt={active.title}
            style={styles.pizza}
          />

          <button
            style={{ ...styles.navBtn, ...styles.navLeft }}
            onClick={prev}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            style={{ ...styles.navBtn, ...styles.navRight }}
            onClick={next}
            aria-label="Next"
          >
            ›
          </button>
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
    top: 90,
    left: "50%",
    transform: "translateX(-50%)",
    width: "min(760px, 92%)",
    textAlign: "center",
    zIndex: 6,
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
    bottom: -430,
    width: 820,
    transform: "translateX(-50%)",
    pointerEvents: "none",
    zIndex: 2,
  },

  arcWrap: {
    position: "absolute",
    left: "50%",
    bottom: -150,
    transform: "translateX(-50%)",
    width: 1000,
    height: 600,
    pointerEvents: "none",
    zIndex: 3,
  },
  arcSvg: {
    display: "block",
  },
  ringOuter: {
    fill: "none",
    stroke: "rgba(255, 255, 255, 0.6)",
    strokeWidth: 1,
  },

  ringInner: {
    fill: "none",
    stroke: "rgba(255, 255, 255, 0.6)",
    strokeWidth: 1,
  },
  arcText: {
    fontSize: 12,
    letterSpacing: "4px",
    textTransform: "uppercase",
    fill: "rgba(255,255,255,0.90)",
    dominantBaseline: "middle",
  },
  arcDot: {
    fill: "#ffffff",
    filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
  },
  navBtn: {
    position: "absolute",
    top: "62%",
    transform: "translateY(-50%)",
    width: 56,
    height: 56,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(0,0,0,0.35)",
    color: "#fff",
    cursor: "pointer",
    zIndex: 7,
    fontSize: 34,
    lineHeight: "56px",
    textAlign: "center",
    backdropFilter: "blur(6px)",
  },
  navLeft: { left: 28 },
  navRight: { right: 28 },
};

function arcPath(cx: number, cy: number, r: number): string {
  const startX = cx - r;
  const startY = cy;
  const endX = cx + r;
  const endY = cy;
  return `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`;
}

function dotPos(
  activeIndex: number,
  total: number,
  cx: number,
  cy: number,
  r: number
): { x: number; y: number } {
  const t = total <= 1 ? 0 : activeIndex / (total - 1);
  const angle = Math.PI - Math.PI * t;

  return {
    x: cx + r * Math.cos(angle),
    y: cy - r * Math.sin(angle),
  };
}
