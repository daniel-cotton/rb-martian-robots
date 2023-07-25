import { IOParser } from '../ioparser';

import { Position } from '../../model/position';
import { Orientation } from '../../model/orientation';
import { Instruction } from '../../model/instruction';

const sampleInput = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

describe('IOParser :: parseInput', () => {

  it('should parse world max position from input', () => {
    const expectedPosition = new Position({ x: 5, y: 3 });

    const {
      world,
    } = IOParser.parseInput(sampleInput);

    expect(world.maxPosition).toEqual(expectedPosition);
  });

  it('should parse robots from input', () => {
    const {
      robotsWithInstructions,
    } = IOParser.parseInput(sampleInput);

    const firstRobot = robotsWithInstructions[0].robot;
    expect(firstRobot.position).toEqual(new Position({ x: 1, y: 1 }));
    expect(firstRobot.orientation).toEqual(Orientation.EAST);

    const secondRobot = robotsWithInstructions[1].robot;
    expect(secondRobot.position).toEqual(new Position({ x: 3, y: 2 }));
    expect(secondRobot.orientation).toEqual(Orientation.NORTH);

    const thirdRobot = robotsWithInstructions[2].robot;
    expect(thirdRobot.position).toEqual(new Position({ x: 0, y: 3 }));
    expect(thirdRobot.orientation).toEqual(Orientation.WEST);
  });

  it('should parse instructionsArray from input', () => {
    const {
      robotsWithInstructions,
    } = IOParser.parseInput(sampleInput);

    const firstRobotInstructions = robotsWithInstructions[0].instructions;
    expect(firstRobotInstructions).toEqual([
      Instruction.RIGHT,
      Instruction.FORWARD,
      Instruction.RIGHT,
      Instruction.FORWARD,
      Instruction.RIGHT,
      Instruction.FORWARD,
      Instruction.RIGHT,
      Instruction.FORWARD,
    ]);

    const secondRobotInstructions = robotsWithInstructions[1].instructions;

    expect(secondRobotInstructions).toEqual([
      Instruction.FORWARD,
      Instruction.RIGHT,
      Instruction.RIGHT,
      Instruction.FORWARD,
      Instruction.LEFT,
      Instruction.LEFT,
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.RIGHT,
      Instruction.RIGHT,
      Instruction.FORWARD,
      Instruction.LEFT,
      Instruction.LEFT,
    ]);

    const finalRobotInstructions = robotsWithInstructions[2].instructions;

    expect(finalRobotInstructions).toEqual([
      Instruction.LEFT,
      Instruction.LEFT,
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.LEFT,
      Instruction.FORWARD,
      Instruction.LEFT,
      Instruction.FORWARD,
      Instruction.LEFT,
    ]);
  });
});
