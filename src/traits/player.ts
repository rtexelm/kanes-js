import { trait } from "koota";

export const Player = trait({
  color: "red",
  segments: [] as { x: number; y: number }[],
  tail: {} as { x: number; y: number },
});
