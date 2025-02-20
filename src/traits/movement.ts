import { trait } from "koota";

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export const Movement = trait({ speed: 10, direction: Direction.Down });
