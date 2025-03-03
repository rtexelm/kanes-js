export function getPlayerStartingPos(
  width: number,
  height: number,
  velY: number
) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return velY > 0
    ? {
        x: Math.floor(halfWidth - halfWidth / 2),
        y: Math.floor(halfHeight),
      }
    : {
        x: Math.floor(halfWidth + halfWidth / 2),
        y: Math.floor(halfHeight),
      };
}
