import { Robot } from '../robot';
import { Scent } from '../scent';

/**
 * An implementation of the world in which the robots move.
 * 
 * @class World
 * @property {number} width - The width of the world
 * @property {number} height - The height of the world
 * 
 * The above are the upper-right coordinates of the rectangular 
 * world, the lower-left coordinates are assumed to be 0, 0.
 * 
 * Illustration:
 * 
 * | - | - | - | - | - | (width, height)
 * | - | - | - | - | - |
 * | - | - | - | - | - |
 * | - | - | - | - | - |
 * | - | - | - | - | - |
 * | - | - | - | - | - |
 * (0, 0)
 * 
 */
export class World {
  width = 0;
  height = 0;

  robots: Robot[] = [];
  scents: Scent[] = [];

  /**
   * Creates an instance of World
   * which models the Mars Planet
   */
  constructor({ width, height }: { width: number, height: number }) {
    this._setWorldDimensions({ width, height });
  }

  /**
   * Initialises the world dimensions to the given
   * width and height.
   */
  _setWorldDimensions({ width, height }: { width: number, height: number }) {
    // Validate world dimensions
    if (width < 0 || height < 0) throw new Error('World dimensions must be positive');
    if (width === 0 && height === 0) throw new Error('World dimensions must be greater than (0, 0)');
    // Set world dimensions
    this.width = width;
    this.height = height;
  }

  /**
   * Test if given coordinates are in-world
   * or if they are invalid.
   * 
   * @param {number} x - The x coordinate to test
   * @param {number} y - The y coordinate to test
   * 
   * @returns {boolean} isInWorld - Whether the coordinates are in the world
   */
  isInWorld({ x, y }: { x: number, y: number }) {
    return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
  }
  
  /**
   * Adds robot to world
   * 
   * @param {Robot} robot - The robot to add to the world
   */
  addRobot(robot: Robot) {
    this.robots.push(robot);
  }

  /**
   * Returns the robots in the world
   * 
   * @returns {Robot[]} - The robots in the world
   */
  getRobots() {
    return this.robots;
  }

  /**
   * Adds scent to world
   * 
   * @param {Scent} scent - The scent to add to the world
   * 
   */
  addScent(scent: Scent) {
    this.scents.push(scent);
  }

  /**
   * Returns the scents in the world
   * 
   * @returns {Scent[]} - The scents in the world
   */
  getScents() {
    return this.scents;
  }
}