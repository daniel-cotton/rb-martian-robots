import { useState, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { World } from '@rb-martian-robots/martian-robots';

import WorldRenderer from './world-renderer/world-renderer';
import { MartianRobotsGUIController } from '../controller/MartianRobotsGUIController';

const animation_step = 500;

export function App() {
  const [instructions, setInstructions] = useState<string>('');
  const [output, setOutput] = useState<string>('');
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

  const startSimulation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const result = await guiController.run(instructions);
    setOutput(result);
  }
  return (
    <StyledApp>
      <GlobalStyle />
      <Content>
        <Card>
          <h1>Martian Robots</h1>
          <IOSection>
            <InputForm onSubmit={startSimulation}>
              <h2>Input</h2>
              <textarea id="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
              <button type="submit">Start</button>
            </InputForm>
            <div>
              <h2>Output</h2>
              <textarea disabled>{output}</textarea>
            </div>
          </IOSection>
        </Card>
        {world && <WorldRenderer world={world} />}
      </Content>
    </StyledApp>
  );
}

export default App;

const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean; }>`
  html, body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }
`;

const StyledApp = styled.div`
  background: url("${require('../assets/textures/mars-tileable-cc-by.png')}") repeat;
  font-family: Helvetica, sans-serif;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  width: 90vw;
  margin: 0 auto;
  padding: 2rem 0;
  box-sizing: border-box;
  height: 100vh;
  color: #fff;
  h1 {
    text-align: center;
  }
`;

const Card = styled.section`
  color: #000;
  background: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
`;

const IOSection = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  & > * {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & > * > * {
    display: block;
    margin: 0.5rem 0;
  }
  & textarea {
    min-height: 150px;
    min-width: 200px;
  }
`;

const InputForm = styled.form`
  button {
    background: #000;
    color: #fff;
    border: 0;
    padding: 0.5rem 2rem;
    min-width: 200px;
    border-radius: 0.5rem;
  }
`;