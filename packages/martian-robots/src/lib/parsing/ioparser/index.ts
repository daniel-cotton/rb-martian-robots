import { World } from '../../model/world';

import { Instruction } from '../../model/instruction';
import { Robot } from '../../model/robot';
import { Position } from '../../model/position';
import { Orientation } from '../../model/orientation';

export type RobotInstructionPair = {
  robot: Robot;
  instructions: Instruction[];
};

type ParsedInput = {
  world: World;
  robotsWithInstructions: RobotInstructionPair[];
};

const ORIENTATION_MAP = {
  N: Orientation.NORTH,
  E: Orientation.EAST,
  S: Orientation.SOUTH,
  W: Orientation.WEST,
};

const INSTRUCTION_MAP = {
  R: Instruction.RIGHT,
  L: Instruction.LEFT,
  F: Instruction.FORWARD,
};

export class IOParser {
  static parseInput(input: string): ParsedInput {
    const world = this._parseWorld(input);
    const robotsWithInstructions = this._parseRobotsWithInstructions(input, world);
    return { world, robotsWithInstructions };
  }

  static serialiseOutput(world: World): string {
    return [
      this._serialiseRobots(world.getRobots())
    ].join("\n");
  }

  private static _parseWorld(input: string): World {
    const firstLine = input.split('\n')[0];
    const digits = firstLine.split(' ').map((digit) => parseInt(digit, 10));

    const maxPosition = new Position({ x: digits[0], y: digits[1] });

    return new World({ maxPosition });
  }

  private static _parseRobotsWithInstructions(input: string, world: World) {
    const allExceptFirstLine = input.split('\n').slice(1).join('\n');
    const robotInstructionBlocks = allExceptFirstLine.split('\n\n');

    const robotsWithInstructions: RobotInstructionPair[] =
      robotInstructionBlocks.map(robotInstructionBlock => this._parseRobotInstructionBlock(robotInstructionBlock, world));

    return robotsWithInstructions;
  }

  /**
   * Parses an individual RobotInstructionBlock
   *
   * @param {string} robotInstructionBlock of the form
   * 3 2 N
   * FRRFLLFFRRFLL
   */
  private static _parseRobotInstructionBlock(
    robotInstructionBlock: string,
    world: World,
  ): RobotInstructionPair {
    // Robot Parsing
    const firstLine = robotInstructionBlock.split('\n')[0];
    const characters = firstLine.split(' ');
    const [x, y, orientation] = [
      parseInt(characters[0]),
      parseInt(characters[1]),
      characters[2],
    ];

    const robotPosition = new Position({ x, y });
    const robotOrientation = ORIENTATION_MAP[orientation as keyof typeof ORIENTATION_MAP];

    // Instruction Parsing
    const secondLine = robotInstructionBlock.split('\n')[1];
    const instructions = secondLine.split('').map((instruction) => {
      return INSTRUCTION_MAP[instruction as keyof typeof INSTRUCTION_MAP];
    });

    return {
      robot: new Robot(world, robotPosition, robotOrientation, false),
      instructions,
    };
  }

  private static _serialiseRobots(robots: Robot[]): string {
    return robots.map(robot => this._serialiseRobot(robot)).join("\n");
  }

  private static _serialiseRobot(robot: Robot): string {
    const orientationKey = Object.entries(ORIENTATION_MAP).find(([key, value]) => value === robot.getOrientation())?.[0];
    return [robot.getPosition().x, robot.getPosition().y, orientationKey || "", robot.getIsLost() ? "LOST" : ""]
      .map(value => value.toString())
      .filter(value => !!value)
      .join(" ");
  }
}
