import { World } from "koota";
import { Position, Player, Segments, Grid } from "../traits";

export function updateGrid(world: World) {
  const results = world.query(Position, Player, Segments);

  results.updateEach(([position, player, segments]) => {
    const { map } = world.get(Grid)!;

    const snakeCoordinates = [position, ...segments.positions];
    for (const segment of snakeCoordinates) {
      map[segment.y][segment.x] = player.color;
    }
    world.set(Grid, { map });
    console.log(map);
  });
}
