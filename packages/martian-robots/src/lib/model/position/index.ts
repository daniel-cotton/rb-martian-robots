export class Position {
  x: number;
  y: number;

  constructor({ x, y } : { x: number, y: number }) {
    if (x > 50 || y > 50) throw new Error('X / Y Coordinates must both be less than 50.');
    if (x < 0 || y < 0) throw new Error('X / Y Coordinates must be positive.');
    this.x = x;
    this.y = y;
  }
}