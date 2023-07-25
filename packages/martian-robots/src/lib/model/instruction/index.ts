import { Orientation } from "../orientation";
import { Position } from "../position";

export class Instruction {
  execute(position: Position, orientation: Orientation) {
    throw new Error('Method not implemented, use a specific "Instruction" implementation.');
  }
}