export function wrapIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

export function getDirection(
  prev: number,
  next: number,
  total: number
): 1 | -1 {
  if (total <= 1 || prev === next) return 1;

  const forward = wrapIndex(prev + 1, total) === next;
  const backward = wrapIndex(prev - 1, total) === next;

  if (forward) return 1;
  if (backward) return -1;

  return next > prev ? 1 : -1;
}
