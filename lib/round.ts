export const round = (x: number) =>
  Math.round((x + Number.EPSILON) * 100) / 100;
