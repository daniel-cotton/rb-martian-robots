import inquirer from 'inquirer';

import { MartianRobotsController } from "@rb-martian-robots/martian-robots";

export class MartianRobotsCLIController extends MartianRobotsController {
  launch(): Promise<void> {
    return inquirer
      .prompt([
        {
          name: 'input',
          message: 'Please enter your input:',
          type: 'editor'
        }
      ])
      .then(async ({ input } : { input: string; }) => {
        const result = await this.run(input);
        console.log(result);
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.error("Error: Prompt couldn't be rendered in the current environment");
        } else {
          console.error("Error: Please validate your input and retry");
        }
      });
  }
  async run(input: string): Promise<string> {
    this.parseInput(input);
    if (!this.world) {
      throw new Error('World not initialised');
    }
    // Loop over each robot/instruction sequentially (nested loop)
    this.robotsWithInstructions.forEach(({ robot, instructions }) => {
      instructions.forEach(instruction => {
        this.runInstruction(robot, instruction);
      });
    });
    // Serialise the output and return it
    const output = this.serialiseOutput();
    return output;
  }
}