export function getPlayerStartingPos(
  width: number,
  height: number,
  velY: number
) {
  const quarterWidth = width / 4;
  const halfHeight = height / 2;

  return velY > 0
    ? {
        x: Math.floor(quarterWidth),
        y: Math.floor(halfHeight),
      }
    : {
        x: Math.floor(3 * quarterWidth),
        y: Math.floor(halfHeight),
      };
}
