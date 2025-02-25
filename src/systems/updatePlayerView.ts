import { World } from "koota";
import { SNAKE_WIDTH } from "../constants";
import { Player, Position, Velocity, PrevVelocity } from "../traits";

function createSegmentElement(
  from: { x: number; y: number },
  to: { x: number; y: number },
  color: string
) {
  const segmentElement = document.createElement("div");
  segmentElement.classList.add("segment");

  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    const width = Math.abs(deltaX);
    segmentElement.style.width = `${width}px`;
    segmentElement.style.height = `${SNAKE_WIDTH}px`;
  } else {
    const height = Math.abs(deltaY);
    segmentElement.style.width = `${SNAKE_WIDTH}px`;
    segmentElement.style.height = `${height}px`;
  }

  segmentElement.style.backgroundColor = color;

  segmentElement.style.transform = `translate(${Math.min(
    from.x,
    to.x
  )}px, ${Math.min(from.y, to.y)}px)`;

  // segmentElement.style.left = `${Math.min(from.x, to.x)}px`;
  // segmentElement.style.top = `${Math.min(from.y, to.y)}px`;

  return segmentElement;
}

function updateLatestSegment(
  head: { x: number; y: number },
  segmentStart: { x: number; y: number },
  latestSegment: HTMLElement
) {
  const deltaX = segmentStart.x - head.x;
  const deltaY = segmentStart.y - head.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    const width = Math.abs(deltaX); // Change this to an addition to existing width on each render
    console.log("width", width);
    latestSegment.style.width = `${width}px`;
    latestSegment.style.height = `${SNAKE_WIDTH}px`;
    latestSegment.offsetWidth;
  } else {
    const height = Math.abs(deltaY);
    console.log("height", height);
    latestSegment.style.height = `${height}px`;
    latestSegment.style.width = `${SNAKE_WIDTH}px`;
    latestSegment.offsetWidth;
  }

  latestSegment.style.transform = `translate(${Math.min(
    head.x,
    segmentStart.x
  )}px, ${Math.min(head.y, segmentStart.y)}px)`;

  // latestSegment.style.left = `${Math.min(head.x, segmentStart.x)}px`;
  // latestSegment.style.top = `${Math.min(head.y, segmentStart.y)}px`;
}

export function updatePlayerView(world: World) {
  const viewport = document.querySelector(".viewport");

  const results = world.query(Player, Position, Velocity, PrevVelocity);
  results.updateEach(([player, position, velocity, prevVelocity]) => {
    const { color, segments, tail } = player;

    // if (!segments.length) {
    //   console.log("creatingFirstSegment");

    //   const segmentElement = createSegmentElement(position, tail, color);
    //   viewport?.appendChild(segmentElement);
    // }
    if (velocity.x !== prevVelocity.x || velocity.y !== prevVelocity.y) {
      const segmentElement = createSegmentElement(position, segments[0], color);
      viewport?.appendChild(segmentElement);
    }

    const allSegmentElements = viewport?.querySelectorAll(".segment");
    const latestSegment = allSegmentElements?.[
      allSegmentElements?.length - 1
    ] as HTMLElement;
    console.log("latestSegment", latestSegment);
    if (latestSegment) {
      console.log("updatingLatestSegment");
      updateLatestSegment(position, segments[0], latestSegment);
    }

    // const snakeCoordinates = [position, ...segments, tail];
    // console.log(snakeCoordinates);
    // for (let i = 0; i < snakeCoordinates.length - 1; i++) {
    //   const from = snakeCoordinates[i];
    //   const to = snakeCoordinates[i + 1];
    // }
  });
}

//
