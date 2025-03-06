import { World } from "koota";
import { Position, Segments, Grid } from "../traits";

export function detectCollisions(world: World) {
  const results = world.query(Position, Segments);
  results.updateEach(([position, segments], entity) => {
    // const { positions } = world.get(Segments)!;
    const head = position;
    // const tail = positions.slice();
    const id = entity.id();
    const { map } = world.get(Grid)!;
    const gridPosition = map[head.y][head.x];

    if (gridPosition !== 0 && gridPosition !== id) {
      if (gridPosition > 0) {
        console.log("Collided with other snake");
      } else {
        console.log("Collided with food");
      }
      console.log("Other collision detected");
    } else if (gridPosition === id) {
      console.log("Collided with self");
    }
  });
}
