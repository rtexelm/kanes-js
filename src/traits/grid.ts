import { trait } from "koota";
import { GRID_SIZE } from "../constants";

export const Grid = trait({
  size: GRID_SIZE,
  square: 0,
});
