import { IOParser } from '../ioparser';

import { Position } from '../../model/position';
import { Orientation } from '../../model/orientation';
import { Instruction } from '../../model/instruction';
import { Robot } from '../../model/robot';
import { World } from '../../model/world';

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

describe('IOParser :: serialiseOutput', () => {

  it('should serialise single robot into output', () => {
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    const robot = new Robot(world, new Position({ x: 1, y: 1 }), Orientation.EAST, false);

    world.addRobot(robot);

    const output = IOParser.serialiseOutput(world);

    expect(output).toEqual(`1 1 E`);
  });

  it('should serialise multiple robots into output', () => {
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    const firstRobot = new Robot(world, new Position({ x: 1, y: 1 }), Orientation.EAST, false);
    const secondRobot = new Robot(world, new Position({ x: 3, y: 2 }), Orientation.NORTH, false);
    const thirdRobot = new Robot(world, new Position({ x: 0, y: 3 }), Orientation.WEST, false);

    world.addRobot(firstRobot);
    world.addRobot(secondRobot);
    world.addRobot(thirdRobot);

    const output = IOParser.serialiseOutput(world);

    expect(output).toEqual(`1 1 E
3 2 N
0 3 W`);
  });

  it('should serialise robot as lost if it is lost', () => {
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    const robot = new Robot(world, new Position({ x: 1, y: 1 }), Orientation.EAST, true);

    world.addRobot(robot);

    const output = IOParser.serialiseOutput(world);

    expect(output).toEqual(`1 1 E LOST`);
  });

  it('should serialise multiple robots as lost if they are lost', () => {
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    const firstRobot = new Robot(world, new Position({ x: 1, y: 1 }), Orientation.EAST, true);
    const secondRobot = new Robot(world, new Position({ x: 3, y: 2 }), Orientation.NORTH, true);
    const thirdRobot = new Robot(world, new Position({ x: 0, y: 3 }), Orientation.WEST, true);

    world.addRobot(firstRobot);
    world.addRobot(secondRobot);
    world.addRobot(thirdRobot);

    const output = IOParser.serialiseOutput(world);

    expect(output).toEqual(`1 1 E LOST
3 2 N LOST
0 3 W LOST`);
  });
});
