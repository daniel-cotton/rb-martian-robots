import { World } from '../world';

import { Position } from '../position';
import { Robot } from '../robot';
import { Orientation } from '../orientation';

describe('World :: Constructor', () => {
  // World Constructor Tests
  it('world should throw if width/height less than (0, 1) or (1, 0)', () => {
    expect(() => {
      new World({ maxPosition: new Position({ x: 0, y: 0 }) });
    }).toThrow(Error);
  });
  it('world should throw if width/height greater than (50, 50), (50, 0) or (0, 50)', () => {
    expect(() => {
      new World({ maxPosition: new Position({ x: 51, y: 51 }) });
    }).toThrow(Error);
    expect(() => {
      new World({ maxPosition: new Position({ x: 51, y: 0 }) });
    }).toThrow(Error);
    expect(() => {
      new World({ maxPosition: new Position({ x: 0, y: 51 }) });
    }).toThrow(Error);
  });
  it('world should throw if width or height are negative', () => {
    expect(() => {
      new World({ maxPosition: new Position({ x: -1, y: 0 }) });
    }).toThrow(Error);
    expect(() => {
      new World({ maxPosition: new Position({ x: 0, y: -1 }) });
    }).toThrow(Error);
    expect(() => {
      new World({ maxPosition: new Position({ x: -1, y: -1 }) });
    }).toThrow(Error);
  });
});

describe('World :: addRobot', () => {
  it('addRobot should store one robot', () => {
    // Construct world
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    // Construct robot
    const robotOne = new Robot(world, new Position({ x: 1, y: 2 }), Orientation.NORTH, false);
    // Should have zero robots to start
    expect(world.getRobots().length).toEqual(0);
    // Add a robot
    world.addRobot(robotOne);
    // Should have one robot
    expect(world.getRobots().length).toEqual(1);
    // Robot should equal robotOne
    expect(world.getRobots()[0]).toEqual(robotOne);
  });

  it('addRobot should store three robots', () => {
    // Construct world
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    // Construct three robots
    const robotOne = new Robot(world, new Position({ x: 1, y: 2 }), Orientation.NORTH, false);
    const robotTwo = new Robot(world, new Position({ x: 1, y: 2 }), Orientation.NORTH, false);
    const robotThree = new Robot(world, new Position({ x: 1, y: 2 }), Orientation.NORTH, false);
    // Should have zero robots to start
    expect(world.getRobots().length).toEqual(0);
    // Add three robots
    world.addRobot(robotOne);
    world.addRobot(robotTwo);
    world.addRobot(robotThree);
    // Should have three robots
    expect(world.getRobots().length).toEqual(3);
    // Confirm robots are stored in order
    expect(world.getRobots()[0]).toEqual(robotOne);
    expect(world.getRobots()[1]).toEqual(robotTwo);
    expect(world.getRobots()[2]).toEqual(robotThree);
  });
});

describe('World :: addScent', () => {
  it('addScent should store one scent', () => {
    // Construct Scent
    const scentOne = new Position({ x: 1, y: 2 });
    // Construct World
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    // Should have zero scents to start
    expect(world.getScents().length).toEqual(0);
    // Add a scent
    world.addScent(scentOne);
    // Should have one scent
    expect(world.getScents().length).toEqual(1);
    // Scent should equal scentOne
    expect(world.getScents()[0]).toEqual(scentOne);
  });

  it('addScent should store three scents', () => {
    // Construct three robots
    const scentOne = new Position({ x: 1, y: 2 });
    const scentTwo = new Position({ x: 1, y: 3 });
    const scentThree = new Position({ x: 2, y: 2 });
    // Construct world
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    // Should have zero scents to start
    expect(world.getScents().length).toEqual(0);
    // Add three scents
    world.addScent(scentOne);
    world.addScent(scentTwo);
    world.addScent(scentThree);
    // Should have three scents
    expect(world.getScents().length).toEqual(3);
    // Confirm scents are stored in order
    expect(world.getScents()[0]).toEqual(scentOne);
    expect(world.getScents()[1]).toEqual(scentTwo);
    expect(world.getScents()[2]).toEqual(scentThree);
  });
});

describe('World :: isScentPresent', () => {
  it('isScentPresent should return false if no scent at test location', () => {
    // Construct Scent
    const scentOne = new Position({ x: 1, y: 2 });
    // Construct World
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    // Add a scent
    world.addScent(scentOne);
    // Should have one robot
    expect(world.isScentPresent(new Position({ x: 1, y: 3 }))).toEqual(false);
  });

  it('isScentPresent should return true if scent at test location', () => {
    // Construct Scent
    const scentOne = new Position({ x: 1, y: 2 });
    // Construct World
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    // Add a scent
    world.addScent(scentOne);
    // Should have one robot
    expect(world.isScentPresent(new Position({ x: 1, y: 2 }))).toEqual(true);
  });
});

describe('World :: isInWorld', () => {
  it('isInWorld should return false for negative coordinates', () => {
    // Construct World
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    // Test negative coordinates
    expect(world.isInWorld({ x: -1, y: 0 })).toEqual(false);
    expect(world.isInWorld({ x: 0, y: -1 })).toEqual(false);
    expect(world.isInWorld({ x: -1, y: -1 })).toEqual(false);
  });
  it('isInWorld should return false for coordinates greater than world', () => {
    // Construct World
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    // Test coordinates greater than world
    expect(world.isInWorld({ x: 6, y: 0 })).toEqual(false);
    expect(world.isInWorld({ x: 0, y: 4 })).toEqual(false);
  });
  it('isInWorld should return true for coordinates within world', () => {
    // Construct World
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    // Test coordinates within world
    expect(world.isInWorld({ x: 4, y: 2 })).toEqual(true);
  });
  it('isInWorld should return true for coordinates on edges of world', () => {
    // Construct World
    const world = new World({ maxPosition: new Position({ x: 5, y: 3 }) });
    // Test coordinates on edge of world
    expect(world.isInWorld({ x: 5, y: 0 })).toEqual(true);
    expect(world.isInWorld({ x: 0, y: 3 })).toEqual(true);
    expect(world.isInWorld({ x: 5, y: 3 })).toEqual(true);
    expect(world.isInWorld({ x: 0, y: 0 })).toEqual(true);
  });
  test.each([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3]
  ])('isInWorld should return true for ALL coordinates within world', (x, y) => {
    // Construct World
    const world = new World({ maxPosition: new Position({ x: 3, y: 3 }) });
    // Test coordinates within world
    expect(world.isInWorld({ x, y })).toEqual(true);
  });
});
