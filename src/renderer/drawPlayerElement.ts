import "./player.css";
import { Entity } from "koota";
import { Player, Position, Ref } from "../traits";

export function drawPlayerView(player: Entity) {
  const viewport = document.querySelector(".viewport");

  const playerElement = document.createElement("div");
  playerElement.classList.add("player");
  viewport?.appendChild(playerElement);

  const headPos = player.get(Position)!;
  const { color } = player.get(Player)!;

  playerElement.style.transform = `translate(${headPos.x}px, ${headPos.y}px)`;
  playerElement.style.backgroundColor = color;

  player.add(Ref({ value: playerElement }));
}
