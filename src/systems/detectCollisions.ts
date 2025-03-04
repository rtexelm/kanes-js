import { World } from "koota";
import { Position, Segments } from "../traits";
import { Grid } from "../traits/grid";

export function detectCollisions(world: World) {
  const results = world.query(Position, Segments);
  results.updateEach(([position, segments]) => {
    const { positions } = world.get(Segments)!;
    const head = position;
    const tail = positions.slice();

    for (const segment of tail) {
      if (head.x === segment.x && head.y === segment.y) {
        console.log("collision detected");
      }
    }
  });
}
