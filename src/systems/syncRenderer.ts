import { World } from "koota";
import { Position, Ref } from "../traits";

export function syncRenderer(world: World) {
  world.query(Ref, Position).updateEach(([ref, position]) => {
    ref.value.style.transform = `translate(${position.x}px, ${position.y}px)`;
  });
}
