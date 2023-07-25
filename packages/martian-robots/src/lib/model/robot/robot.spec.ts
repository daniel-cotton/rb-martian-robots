import { Robot } from '../robot';

import { Position } from '../position';
import { Orientation } from '../orientation';
import { Instruction } from '../instruction';
import { World } from '../world';

// Reusable dummy data
const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
const position = new Position({ x: 1, y: 2 });
const orientation = Orientation.NORTH;
const isLost = false;

describe('Robot :: Constructor', () => {
  it('Robot should construct with valid Position, Orientation and isLost', () => {
    const robot = new Robot(world, position, orientation, isLost);
    expect(robot.getPosition()).toEqual(position);
    expect(robot.getOrientation()).toEqual(orientation);
    expect(robot.isLost()).toEqual(isLost);
  });
});

describe('Robot :: followInstruction', () => {
  it('robot should follow valid forward instruction', () => {
    const robot = new Robot(world, position, orientation, isLost);
    const instruction = Instruction.FORWARD;
    robot.followInstruction(instruction);
    expect(robot.getPosition()).toEqual(new Position({ x: 1, y: 3 }));
    expect(robot.getOrientation()).toEqual(orientation);
    expect(robot.isLost()).toEqual(isLost);
  });
  it('robot should show as lost after crossing 0 on X or Y', () => {
    const robot = new Robot(world, position, Orientation.SOUTH, isLost);
    const instruction = Instruction.FORWARD;
    // One Step
    robot.followInstruction(instruction);
    expect(robot.getPosition()).toEqual(new Position({ x: 1, y: 1 }));
    expect(robot.getOrientation()).toEqual(orientation);
    expect(robot.isLost()).toEqual(false);

    // Second Step
    robot.followInstruction(instruction);
    expect(robot.getPosition()).toEqual(new Position({ x: 1, y: 0 }));
    expect(robot.getOrientation()).toEqual(orientation);
    expect(robot.isLost()).toEqual(false);

    // Final Step
    robot.followInstruction(instruction);
    expect(robot.getPosition()).toEqual(new Position({ x: 1, y: 0 }));
    expect(robot.getOrientation()).toEqual(orientation);
    expect(robot.isLost()).toEqual(true);
  });
  it('robot should show as lost after crossing max bounds of world', () => {
    const robot = new Robot(world, position, Orientation.NORTH, isLost);
    const instruction = Instruction.FORWARD;
    // First Step
    robot.followInstruction(instruction);
    expect(robot.getPosition()).toEqual(new Position({ x: 1, y: 3 }));
    expect(robot.getOrientation()).toEqual(orientation);
    expect(robot.isLost()).toEqual(false);

    // Final Step
    robot.followInstruction(instruction);
    expect(robot.getPosition()).toEqual(new Position({ x: 1, y: 3 }));
    expect(robot.getOrientation()).toEqual(orientation);
    expect(robot.isLost()).toEqual(true);
  });
});