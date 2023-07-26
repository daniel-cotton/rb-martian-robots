import { MartianRobotsController, World } from "@rb-martian-robots/martian-robots";

export class MartianRobotsGUIController extends MartianRobotsController {
  private stateCallback: (world: World) => void;
  private animationDelay: number;

  constructor(stateCallback: (world: World) => void, animationDelay: number) {
    super();
    this.stateCallback = stateCallback;
    this.animationDelay = animationDelay;
  }
  async run(input: string): Promise<string> {
    this.parseInput(input);
    if (!this.world) {
      throw new Error('World not initialised');
    }
    // Loop over each robot/instruction sequentially, delaying for animation time
    for (let i = 0; i < this.robotsWithInstructions.length; i++) {
      const { robot, instructions } = this.robotsWithInstructions[i];
      for (let j = 0; j < instructions.length; j++) {
        this.runInstruction(robot, instructions[j]);
        this.stateCallback(this.world);
        await new Promise(resolve => setTimeout(resolve, this.animationDelay));
      }
    }
    // Serialise the output and return it
    const output = this.serialiseOutput();
    return output;
  }
}