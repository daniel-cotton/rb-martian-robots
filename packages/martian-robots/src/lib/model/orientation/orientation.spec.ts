import { Orientation } from '../orientation';

describe('Orientation :: Constructor', () => {
  it('orientation should accept a normalised positive vector x/y component (0 - 1)', () => {
    expect(() => {
      new Orientation({ x: 0, y: 1 });
    }).not.toThrow(Error);
    expect(() => {
      new Orientation({ x: 1, y: 0 });
    }).not.toThrow(Error);
    expect(() => {
      new Orientation({ x: 1, y: 1 });
    }).not.toThrow(Error);
  });
  it('orientation should accept a normalised negative vector x/y component (0 - 1)', () => {
    expect(() => {
      new Orientation({ x: 0, y: -1 });
    }).not.toThrow(Error);
    expect(() => {
      new Orientation({ x: -1, y: 0 });
    }).not.toThrow(Error);
    expect(() => {
      new Orientation({ x: -1, y: -1 });
    }).not.toThrow(Error);
  });
  it('position should throw if vector is out of normalised range', () => {
    expect(() => {
      new Orientation({ x: 2, y: 0 });
    }).toThrow(Error);
    expect(() => {
      new Orientation({ x: 0, y: -2 });
    }).toThrow(Error);
    expect(() => {
      new Orientation({ x: 2, y: -2 });
    }).toThrow(Error);
  });
});


describe('Orientation :: Existing Orientations', () => {
  it('NORTH orientation should be (0, 1)', () => {
    const north = Orientation.NORTH;
    expect(north.x).toEqual(0);
    expect(north.y).toEqual(0);
  });
  it('EAST orientation should be (1, 0)', () => {
    const east = Orientation.EAST;
    expect(east.x).toEqual(1);
    expect(east.y).toEqual(0);
  });
  it('SOUTH orientation should be (0, -1)', () => {
    const south = Orientation.SOUTH;
    expect(south.x).toEqual(0);
    expect(south.y).toEqual(-1);
  });
  it('WEST orientation should be (-1, 0)', () => {
    const west = Orientation.WEST;
    expect(west.x).toEqual(-1);
    expect(west.y).toEqual(0);
  });
});