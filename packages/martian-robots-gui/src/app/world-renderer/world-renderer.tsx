import styled from 'styled-components';

import { World } from '@rb-martian-robots/martian-robots';

import RobotRenderer from '../robot-renderer/robot-renderer';
import ScentRenderer from '../scent-renderer/scent-renderer';

/* eslint-disable-next-line */
export interface WorldRendererProps {
  world: World;
}

const WorldSVG = styled.svg`
  flex: 1;
`;

export function WorldRenderer(props: WorldRendererProps) {
  const maxPosition = props.world.maxPosition;

  const xCoordSize = maxPosition.x + 1;
  const yCoordSize = maxPosition.y + 1;

  return (<WorldSVG width="100%" viewBox={`0 0 ${xCoordSize * 10 + 2} ${yCoordSize * 10 + 2}`}>
    <rect x="1" y="1" width={xCoordSize * 10} height={yCoordSize * 10} stroke="white" fill="transparent" />
    {Array.from({ length: xCoordSize }, (_, x) => x).map((x) =>
      Array.from({ length: yCoordSize }, (_, y) => y).map((y) => (
        <rect
          key={`${x}-${y}`}
          x={x * 10 + 1}
          y={y * 10 + 1}
          width="10"
          height="10"
          stroke="white"
          fill="transparent"
        />
      ))
    )}

    {props.world.getScents()
      .map((position, index) => <ScentRenderer key={index} position={position} maxPosition={maxPosition} />)}

    {props.world.getRobots()
      .map((robot, index) => <RobotRenderer key={index} robot={robot} maxPosition={maxPosition} />)}
  </WorldSVG>);
}

export default WorldRenderer;
