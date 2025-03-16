import { World } from "koota";
import { Time } from "../traits";

export function updateTime(world: World) {
  const time = world.get(Time)!;

  if (time.current === 0) time.current = performance.now();

  const now = performance.now();
  time.delta = now - time.current;
  time.delta = Math.min(time.delta / 1000, 1 / 30);
  time.current = now;
  world.set(Time, time);
}
