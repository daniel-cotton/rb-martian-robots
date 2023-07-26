import styled from 'styled-components';
import { Robot, Position, Orientation } from '@rb-martian-robots/martian-robots';

import robotImage from '../../assets/textures/robot-cc-by.png';

/* eslint-disable-next-line */
export interface RobotRendererProps {
  robot: Robot;
  maxPosition: Position;
}

const RobotImage = styled.image`
  transition: transform 0.5s ease-in-out;
`;

const direction_indexes = [
  Orientation.NORTH,
  Orientation.EAST,
  Orientation.SOUTH,
  Orientation.WEST
];

const rotation_indexes = [
  0,
  90,
  180,
  270
];

const getRotationForOrientation = (orientation: Orientation) => {
  return rotation_indexes[direction_indexes.indexOf(orientation)];
}


export function RobotRenderer(props: RobotRendererProps) {
  return (
    <RobotImage
      href={robotImage}
      height="10"
      width="10"
      x="0"
      y="0"
      style={{
        transform: `translateX(${props.robot.getPosition().x * 10 + 1}px) translateY(${(props.maxPosition.y - props.robot.getPosition().y) * 10 + 1}px) rotate(${getRotationForOrientation(props.robot.getOrientation())}deg)`,
        opacity: props.robot.getIsLost() ? 0.5 : 1
      }}
    />
  );
}

export default RobotRenderer;
