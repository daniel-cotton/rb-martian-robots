import { Instruction } from '../instruction';

import { Orientation } from '../orientation';
import { Position } from '../position';

describe('Instruction :: LEFT (Execute)', () => {
  it('LEFT instruction should rotate robot left (NORTH -> WEST)', () => {
    const instruction = Instruction.LEFT;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.NORTH;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position).toEqual(initialPosition);
    expect(orientation).toEqual(Orientation.WEST);
  });
  it('LEFT instruction should rotate robot left (WEST -> SOUTH)', () => {
    const instruction = Instruction.LEFT;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.WEST;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position).toEqual(initialPosition);
    expect(orientation).toEqual(Orientation.SOUTH);
  });
  it('LEFT instruction should rotate robot left (SOUTH -> EAST)', () => {
    const instruction = Instruction.LEFT;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.SOUTH;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position).toEqual(initialPosition);
    expect(orientation).toEqual(Orientation.EAST);
  });
  it('LEFT instruction should rotate robot left (EAST -> NORTH)', () => {
    const instruction = Instruction.LEFT;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.EAST;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position).toEqual(initialPosition);
    expect(orientation).toEqual(Orientation.NORTH);
  });
});

describe('Instruction :: RIGHT (Execute)', () => {
  it('RIGHT instruction should rotate robot right (NORTH -> EAST)', () => {
    const instruction = Instruction.RIGHT;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.NORTH;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position).toEqual(initialPosition);
    expect(orientation).toEqual(Orientation.EAST);
  });
  it('RIGHT instruction should rotate robot right (EAST -> SOUTH)', () => {
    const instruction = Instruction.RIGHT;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.EAST;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position).toEqual(initialPosition);
    expect(orientation).toEqual(Orientation.SOUTH);
  });
  it('RIGHT instruction should rotate robot right (SOUTH -> WEST)', () => {
    const instruction = Instruction.RIGHT;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.SOUTH;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position).toEqual(initialPosition);
    expect(orientation).toEqual(Orientation.WEST);
  });
  it('RIGHT instruction should rotate robot right (WEST -> NORTH)', () => {
    const instruction = Instruction.RIGHT;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.WEST;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position).toEqual(initialPosition);
    expect(orientation).toEqual(Orientation.NORTH);
  });
});

describe('Instruction :: FORWARD (Execute)', () => {
  it('FORWARD instruction should advance robot in facing orientation by one (NORTH)', () => {
    const instruction = Instruction.FORWARD;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.NORTH;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position.x).toEqual(1);
    expect(position.x).toEqual(3);
    expect(orientation).toEqual(initialOrientation);
  });
  it('FORWARD instruction should advance robot in facing orientation by one (EAST)', () => {
    const instruction = Instruction.FORWARD;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.EAST;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position.x).toEqual(2);
    expect(position.x).toEqual(2);
    expect(orientation).toEqual(initialOrientation);
  });
  it('FORWARD instruction should advance robot in facing orientation by one (SOUTH)', () => {
    const instruction = Instruction.FORWARD;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.SOUTH;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position.x).toEqual(1);
    expect(position.x).toEqual(1);
    expect(orientation).toEqual(initialOrientation);
  });
  it('FORWARD instruction should advance robot in facing orientation by one (WEST)', () => {
    const instruction = Instruction.FORWARD;
    const initialPosition = new Position({ x: 1, y: 2 });
    const initialOrientation = Orientation.WEST;

    const { position, orientation } = instruction.execute(initialPosition, initialOrientation);

    expect(position.x).toEqual(0);
    expect(position.x).toEqual(2);
    expect(orientation).toEqual(initialOrientation);
  });
});