import { World } from "koota";
import { Position, Ref, Player, Segments } from "../traits";
import p5 from "p5";
import { Grid } from "../traits/grid";

export function syncRenderer(world: World) {
  world.query(Ref, Position).updateEach(([ref, position]) => {
    ref.value.style.transform = `translate(${position.x}px, ${position.y}px)`;
  });
}

export function syncRendererP5(world: World, sketch: p5) {
  const { square } = world.get(Grid)!;
  world
    .query(Player, Position, Segments)
    .updateEach(([player, position, segments]) => {
      const { color } = player;
      const snakeCoordinates = [position, ...segments.positions];

      sketch.fill(color);
      for (const segment of snakeCoordinates) {
        sketch.rect(segment.x, segment.y, square, square);
        console.log("segment", segment);
      }
    });
}
