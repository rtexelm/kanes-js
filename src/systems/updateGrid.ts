import { World } from "koota";
import { Position, Player, Segments, Grid } from "../traits";

export function updateGrid(world: World) {
  const results = world.query(Position, Player, Segments);

  results.updateEach(([position, player, segments], entity) => {
    const { map } = world.get(Grid)!;
    const id = entity.id();
    const { prevTail } = segments;

    const snakeCoordinates = [position, ...segments.positions];
    for (const segment of snakeCoordinates) {
      map[segment.y][segment.x] = id;
    }
    map[prevTail.y][prevTail.x] = 0;
    world.set(Grid, { map });
    console.log(map);
  });
}
