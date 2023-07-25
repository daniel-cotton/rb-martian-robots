import { Orientation } from "../orientation";
import { Position } from "../position";

const ORIENTATION_ORDERED = [
  Orientation.NORTH,
  Orientation.EAST,
  Orientation.SOUTH,
  Orientation.WEST
]

export abstract class Instruction {

  static LEFT = new (class extends Instruction {
    override execute(position: Position, orientation: Orientation) {
      // Get Index of current orientation
      // then get previous orientation in ordered list (NORTH -> WEST -> SOUTH -> EAST -> NORTH)
      const orientationIndex = ORIENTATION_ORDERED.indexOf(orientation);
      const newOrientationIndex = orientationIndex > 0 ? orientationIndex - 1 : (ORIENTATION_ORDERED.length - 1);
      const newOrientation = ORIENTATION_ORDERED[newOrientationIndex];
      return { position, orientation: newOrientation };
    }
  })();

  static RIGHT = new (class extends Instruction {
    override execute(position: Position, orientation: Orientation) {
      // Get Index of current orientation
      // then get next orientation in ordered list (NORTH -> EAST -> SOUTH -> WEST -> NORTH)
      const orientationIndex = ORIENTATION_ORDERED.indexOf(orientation);
      const newOrientationIndex = (orientationIndex + 1) % ORIENTATION_ORDERED.length;
      const newOrientation = ORIENTATION_ORDERED[newOrientationIndex];
      return { position, orientation: newOrientation };
    }
  })();

  static FORWARD = new (class extends Instruction {
    override execute(position: Position, orientation: Orientation) {
      const newPosition = new Position({
        x: position.x + orientation.x,
        y: position.y + orientation.y
      });
      return { position: newPosition, orientation };
    }
  })();

  abstract execute(position: Position, orientation: Orientation): { position: Position, orientation: Orientation };
}