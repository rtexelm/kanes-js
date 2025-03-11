import { World } from "koota";
import { Position, Player, Segments, Grid, Food } from "../traits";

export function updateGrid(world: World) {
  const results = world.query(Position, Player, Segments);
  const food = world.queryFirst(Food);
  // TODO perhaps add a subsribe to change here for food position, thus avoid rendering constantly
  const { x: foodX, y: foodY } = food?.get(Position) ?? { x: 0, y: 0 };

  results.updateEach(([position, player, segments], entity) => {
    const { map } = world.get(Grid)!;
    const id = entity.id();
    const { prevTail } = segments;

    const snakeCoordinates = [position, ...segments.positions];
    for (const segment of snakeCoordinates) {
      map[segment.y][segment.x] = id;
    }
    map[prevTail.y][prevTail.x] = 0;

    // Set food position
    if (map[foodY][foodX] !== -1) map[foodY][foodX] = -1;
    // Update world grid
    // console.log("map", map);
    world.set(Grid, { map });
  });
}
