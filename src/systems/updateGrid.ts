import { World } from "koota";
import { Position, Player, Segments, Grid, Food } from "../traits";
import { currentCanvasDimensions } from "../renderer/drawP5Canvas";

export function updateGrid(world: World) {
  const { width: canvasWidth, height: canvasHeight } = currentCanvasDimensions;
  const { cell, dimensions } = world.get(Grid)!;
  const newCellWidth = canvasWidth / dimensions.x;
  const newCellHeight = canvasHeight / dimensions.y;

  if (cell.width !== newCellWidth || cell.height !== newCellHeight) {
    world.set(Grid, { cell: { width: newCellWidth, height: newCellHeight } });
  }

  const results = world.query(Position, Player, Segments);
  const food = world.queryFirst(Food);
  const { x: foodX, y: foodY } = food?.get(Position) ?? { x: 0, y: 0 };
  const { width: foodWidth, height: foodHeight } = food?.get(Food) ?? {
    width: 1,
    height: 1,
  };
  const { map } = world.get(Grid)!;

  results.updateEach(([position, player, segments], entity) => {
    const id = entity.id();
    const { prevTail } = segments;

    const snakeCoordinates = [position, ...segments.positions];
    for (const segment of snakeCoordinates) {
      map[segment.y][segment.x] = id;
    }
    map[prevTail.y][prevTail.x] = 0;
  });
  // Set food positions
  for (let dy = 0; dy < foodHeight; dy++) {
    for (let dx = 0; dx < foodWidth; dx++) {
      const foodPosX = foodX + dx;
      const foodPosY = foodY + dy;

      // Ensure we're within the grid bounds before setting the food position
      if (
        foodPosY >= 0 &&
        foodPosY < map.length &&
        foodPosX >= 0 &&
        foodPosX < map[0].length
      ) {
        map[foodPosY][foodPosX] = -1;
      }
    }
  }
  // Update world grids
  world.set(Grid, { map });
}
