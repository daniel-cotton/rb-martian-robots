import { useState, useMemo } from 'react';
import styled from 'styled-components';

import { World, Robot, Position, Orientation } from '@rb-martian-robots/martian-robots';

import WorldRenderer from './world-renderer/world-renderer';
import { MartianRobotsGUIController } from '../controller/MartianRobotsGUIController';

const StyledApp = styled.div`
  background: url("${require('../assets/textures/mars-tileable-cc-by.png')}") repeat;
`;

const animation_step = 500;

export function App() {
  const [instructions, setInstructions] = useState<string>('');
  const [world, setWorld] = useState<World | null>(null);
  const guiController = useMemo(() => new MartianRobotsGUIController(world => {
    const newWorld = new World({ maxPosition: world.maxPosition });
    world.getRobots().forEach(robot => {
      newWorld.addRobot(robot);
    });
    world.getScents().forEach(scent => {
      newWorld.addScent(scent);
    });
    setWorld(newWorld);
  }, animation_step), []);

  const startSimulation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    guiController.run(instructions);
  }
  return (
    <StyledApp>
      <h1>Martian Robots</h1>
      {world && <WorldRenderer world={world} />}
      <form onSubmit={startSimulation}>
        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        <button type="submit">Start</button>
      </form>
    </StyledApp>
  );
}

export default App;
