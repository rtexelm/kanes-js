import { World } from "koota";
import { Position, Ref, Player } from "../traits";
import p5 from "p5";
import { Grid } from "../traits/grid";

export function syncRenderer(world: World) {
  world.query(Ref, Position).updateEach(([ref, position]) => {
    ref.value.style.transform = `translate(${position.x}px, ${position.y}px)`;
  });
}

export function syncRendererP5(world: World, sketch: p5) {
  const { square } = world.get(Grid)!;
  world.query(Player, Position).updateEach(([player, position]) => {
    const { color } = player;

    // console.log(
    //   `Rendering player at: ${position.x}, ${position.y}, with color: ${color}`
    // );
    // console.log(`Square size: ${square}`);

    sketch.fill(color);
    sketch.rect(position.x, position.y, square, square);
  });
}
