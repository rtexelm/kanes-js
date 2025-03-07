import { World } from "koota";
import { Position, Ref, Player, Segments, Grid, Food } from "../traits";
import p5 from "p5";

export function syncRenderer(world: World) {
  world.query(Ref, Position).updateEach(([ref, position]) => {
    ref.value.style.transform = `translate(${position.x}px, ${position.y}px)`;
  });
}

export function syncRendererP5(world: World, sketch: p5) {
  const { cell } = world.get(Grid)!;
  world
    .query(Player, Position, Segments)
    .updateEach(([player, position, segments]) => {
      const { color } = player;
      // Create an array of the whole snake coordinates
      const snakeCoordinates = [position, ...segments.positions];

      sketch.fill(color);
      // Loop through the snake coordinates and draw each segment multiplying the x and y coordinates by the cell dimensions
      for (const segment of snakeCoordinates) {
        sketch.rect(
          segment.x * cell.width,
          segment.y * cell.height,
          cell.width,
          cell.height
        );
      }
    });
  world.query(Food, Position).updateEach(([food, position]) => {
    const { color } = food;
    sketch.fill(color);
    sketch.rect(
      position.x * cell.width,
      position.y * cell.height,
      cell.width,
      cell.height
    );
  });
}
