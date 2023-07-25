export class Orientation {
  static NORTH = new Orientation({ x: 0, y: 1 });
  static EAST = new Orientation({ x: 1, y: 0 });
  static SOUTH = new Orientation({ x: 0, y: -1 });
  static WEST = new Orientation({ x: -1, y: 0 });

  x: number;
  y: number;

  /**
   * Creates an instance of Orientation
   * which models the direction a robot is facing.
   * 
   * @param {number} x - The x component of the orientation vector (normalised -1 to 1)
   * @param {number} y - The y component of the orientation vector (normalised -1 to 1)
   */
  constructor({ x, y } : { x: number; y: number; }) {
    if (x > 1 || x < -1 || y > 1 || y < -1) throw new Error('Orientation vector must be normalised between -1 and 1.');
    this.x = x;
    this.y = y;
  }
}