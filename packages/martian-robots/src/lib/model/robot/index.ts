import { Instruction } from '../instruction';
import { Orientation } from '../orientation';
import { Position } from '../position';
import { World } from '../world';

export class Robot {
  position: Position;
  orientation: Orientation;
  isLost: boolean;
  world: World;

  constructor(
    world: World,
    position: Position,
    orientation: Orientation,
    isLost: boolean
  ) {
    this.world = world;
    this.position = position;
    this.orientation = orientation;
    this.isLost = isLost;
  }

  getPosition(): Position {
    return this.position;
  }
  getOrientation(): Orientation {
    return this.orientation;
  }
  getIsLost(): boolean {
    return this.isLost;
  }

  followInstruction(instruction: Instruction): void {
    try {
      // Compute new potential position and orientation
      // by executing the instruction
      const { position: potentialPosition, orientation: potentialOrientation } =
        instruction.execute(this.position, this.orientation);
  
      // Check if the potential position is within the world bounds
      const isValidPosition = this.world.isInWorld(potentialPosition);

      const previousPosition = this.position;
      const previousOrientation = this.orientation;

      // Update position and orientation
      this.position = potentialPosition;
      this.orientation = potentialOrientation;
          
      if (!isValidPosition) {
        if (this.world.isScentPresent(previousPosition)) {
          this.position = previousPosition;
          this.orientation = previousOrientation;
        } else {
          this.isLost = true;
        }
      }
    } catch {
      // If error is thrown, position is invalid and
      // cannot be constructed, therefore robot is lost.
      this.isLost = true;
    }
  }
}
