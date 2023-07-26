import styled from 'styled-components';

import { World, Robot, Position, Orientation } from '@rb-martian-robots/martian-robots';

import WorldRenderer from './world-renderer/world-renderer';

const StyledApp = styled.div`
  background: url("${require('../assets/textures/mars-tileable-cc-by.png')}") repeat;
`;

const world = new World({ maxPosition: { x: 8, y: 5 } });
const r1 = new Robot(world, new Position({ x: 1, y: 1 }), Orientation.NORTH, false);
const r2 = new Robot(world, new Position({ x: 4, y: 2 }), Orientation.EAST, false);
world.addRobot(r1);
world.addRobot(r2);

export function App() {

  return (
    <StyledApp>
      <h1>Martian Robots</h1>
      <WorldRenderer world={world} />
    </StyledApp>
  );
}

export default App;
