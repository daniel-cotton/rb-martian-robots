import { Instruction } from "../model/instruction";
import { Robot } from "../model/robot";
import { World } from "../model/world";
import { IOParser, RobotInstructionPair } from "../parsing/ioparser";

export abstract class MartianRobotsController {
  protected world: World | null = null;
  protected robotsWithInstructions: RobotInstructionPair[] = [];

  abstract run(input: string): Promise<string>;

  protected parseInput(input: string): void {
    const { world, robotsWithInstructions } = IOParser.parseInput(input);
    this.world = world;
    this.robotsWithInstructions = robotsWithInstructions;
  }

  protected serialiseOutput(): string {
    if (!this.world) {
      throw new Error('World not initialised');
    }
    return IOParser.serialiseOutput(this.world);
  }

  protected runInstruction(robot: Robot, instruction: Instruction): void {
    robot.followInstruction(instruction);
  };

}