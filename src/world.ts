import { createWorld } from "koota";
import { Time, Grid, Collisions, inPlay } from "./traits";

export const world = createWorld(Time, Grid, Collisions);
