import { trait } from "koota";

export const Segments = trait({
  positions: [] as { x: number; y: number }[],
  prevTail: { x: 0, y: 0 },
});
