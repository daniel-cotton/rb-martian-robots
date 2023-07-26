import { Robot } from '../robot';
import { Position } from '../position';

/**
 * An implementation of the world in which the robots move.
 * 
 * @class World
 * @property {Position} maxPosition - The maximum position of the world
 * 
 * The maxPosition is the upper-right coordinates of the rectangular 
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
  maxPosition: Position = new Position({ x: 0, y: 0 });

  robots: Robot[] = [];
  scents: Position[] = [];

  /**
   * Creates an instance of World
   * which models the Mars Planet
   */
  constructor({ maxPosition }: { maxPosition: Position }) {
    this._setWorldDimensions({ maxPosition });
  }

  /**
   * Initialises the world dimensions to the given
   * width and height.
   */
  _setWorldDimensions({ maxPosition }: { maxPosition: Position }) {
    // Validate world dimensions
    if (maxPosition.x === 0 && maxPosition.y === 0) throw new Error('World dimensions must be greater than (0, 0)');
    // Set world max position
    this.maxPosition = maxPosition;
  }

  /**
   * Test if given coordinates are in-world
   * or if they are invalid.
   * 
   * @param {Position} xy - The x,y coordinate position to test
   * 
   * @returns {boolean} isInWorld - Whether the coordinates are in the world
   */
  isInWorld({ x, y }: Position) {
    return x >= 0 && x <= this.maxPosition.x && y >= 0 && y <= this.maxPosition.y;
  }

  /**
   * Test if given coordinates have an 
   * existing scent
   * 
   * @param {Position} xy - The x,y coordinate position to test
   * 
   * @returns {boolean} isScentPresent - Whether the coordinates have an existing scent
   */
  isScentPresent({ x, y }: Position) {
    return this.getScents()
      .some(scent => scent.x === x && scent.y === y);
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
  addScent(scent: Position) {
    this.scents.push(scent);
  }

  /**
   * Returns the scents in the world
   * 
   * @returns {Position[]} - The scents in the world
   */
  getScents() {
    return this.scents;
  }
}