import { World } from "koota";
import { RoundEnd } from "../traits";
import { actions } from "../actions";

export function updateRoundEnd(world: World) {
  if (!world.has(RoundEnd)) return;
  const { setRoundEnd, setRoundReset } = actions(world);

  let { timer } = world.get(RoundEnd)!;
  // console.log(timer);
  if (timer <= 0) {
    setRoundEnd(false);
    setRoundReset(true);
    return;
  }
  timer -= 1;
  world.set(RoundEnd, { timer: timer });
}
