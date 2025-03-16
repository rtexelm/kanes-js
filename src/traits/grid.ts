import { trait } from "koota";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GRID_HEIGHT,
  GRID_WIDTH,
} from "../constants";

export const Grid = trait({
  dimensions: { x: GRID_WIDTH, y: GRID_HEIGHT },
  cell: {
    width: CANVAS_WIDTH / GRID_WIDTH,
    height: CANVAS_HEIGHT / GRID_HEIGHT,
  },
  map: Array(GRID_HEIGHT)
    .fill(0)
    .map(() => Array(GRID_WIDTH).fill(0)),
});
