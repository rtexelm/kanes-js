import { Entity } from "koota";
import { Ref } from "../traits";

export function erasePlayerView(player: Entity) {
  const ref = player.get(Ref)!;
  ref.value.remove();
  player.remove(Ref);
}
