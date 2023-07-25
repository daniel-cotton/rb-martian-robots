import { Position } from '../position';

describe('Position :: Constructor', () => {
  // Position Constructor Tests
  it('position should throw if either x or y are greater than 50', () => {
    expect(() => {
      new Position({ x: 51, y: 51 });
    }).toThrow(Error);
    expect(() => {
      new Position({ x: 51, y: 0 });
    }).toThrow(Error);
    expect(() => {
      new Position({ x: 0, y: 51 });
    }).toThrow(Error);
  });
  it('position should throw if x or y are negative', () => {
    expect(() => {
      new Position({ x: -1, y: 0 });
    }).toThrow(Error);
    expect(() => {
      new Position({ x: 0, y: -1 });
    }).toThrow(Error);
    expect(() => {
      new Position({ x: -1, y: -1 });
    }).toThrow(Error);
  });
});
