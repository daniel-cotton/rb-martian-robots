import styled from 'styled-components';

import { Position } from "@rb-martian-robots/martian-robots";

import robotImage from '../../assets/textures/robot-cc-by.png';

/* eslint-disable-next-line */
export interface ScentRendererProps {
  position: Position;
  maxPosition: Position;
}

const ScentImage = styled.image`
  -webkit-filter: blur(2px) invert(1);
  filter: blur(2px) invert(1);
`;

export function ScentRenderer(props: ScentRendererProps) {
  return <ScentImage
    href={robotImage}
    height="10"
    width="10"
    x={props.position.x * 10 + 1}
    y={(props.maxPosition.y - props.position.y) * 10 + 1}
  />
}

export default ScentRenderer;
