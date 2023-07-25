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
      const orientationIndex = ORIENTATION_ORDERED.indexOf(orientation);
      const newOrientationIndex = (orientationIndex - 1) % 4;
      const newOrientation = ORIENTATION_ORDERED[newOrientationIndex];
      return { position, orientation: newOrientation };
    }
  })();

  abstract execute(position: Position, orientation: Orientation): { position: Position, orientation: Orientation };
}