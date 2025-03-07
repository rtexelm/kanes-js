import { createWorld } from "koota";
import { Time, Grid, Collisions } from "./traits";

export const world = createWorld(Time, Grid, Collisions);
