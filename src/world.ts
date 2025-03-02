import { createWorld } from "koota";
import { Time } from "./traits";
import { Grid } from "./traits/grid";

export const world = createWorld(Time, Grid);
