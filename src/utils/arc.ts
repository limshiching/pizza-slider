export const ARC = {
  cx: 500,
  cy: 520,
  outerR: 460,
  innerR: 410,
  textR: 485,
  svgW: 1000,
  svgH: 520,
};

export function arcPath(cx: number, cy: number, r: number): string {
  const startX = cx - r;
  const startY = cy;
  const endX = cx + r;
  const endY = cy;
  return `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function dotPos(
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

  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}
