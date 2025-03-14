import { World } from "koota";
import { Position, Ref, Player, Segments, Grid, Food, Lives } from "../traits";
import p5 from "p5";

export function syncRenderer(world: World) {
  world.query(Ref, Position).updateEach(([ref, position]) => {
    ref.value.style.transform = `translate(${position.x}px, ${position.y}px)`;
  });
}

export function syncRendererP5(world: World, sketch: p5) {
  const { cell } = world.get(Grid)!;
  world
    .query(Player, Position, Segments, Lives)
    .updateEach(([player, position, segments, lives], entity) => {
      const { color } = player;
      let c = sketch.color(color);
      // Create an array of the whole snake coordinates
      const snakeCoordinates = [position, ...segments.positions];

      sketch.fill(c);
      // Loop through the snake coordinates and draw each segment multiplying the x and y coordinates by the cell dimensions
      for (const segment of snakeCoordinates) {
        sketch.rect(
          segment.x * cell.width,
          segment.y * cell.height,
          cell.width,
          cell.height
        );
      }
      // Draw lives in respective corners
      sketch.push();
      c.setAlpha(130);
      sketch.fill(c);
      let drawLocale = {
        x: entity.id() % 2 !== 0 ? 11.75 : sketch.width - 11.75,
        y: sketch.height - 8,
      };
      sketch.textFont("Born2bSportyFS");
      sketch.textSize(20);
      sketch.text(`${lives.value}`, drawLocale.x, drawLocale.y);
      sketch.pop();
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
