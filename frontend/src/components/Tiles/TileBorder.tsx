import React from 'react';
import { Line } from 'react-konva';

type Props = {
  tilePosition: {
    x: number;
    y: number;
  };
  points?: number[];
  id: string;
};

const TileBorder: React.FC<Props> = ({ tilePosition, id, points }) => {
  const SIZE = 50;
  const defaultPoints = [0, 0, SIZE, 0, SIZE, SIZE, 0, SIZE, 0, 0];
  const { x, y } = tilePosition;
  return (
    <Line
      id={id}
      x={x}
      y={y}
      points={points || defaultPoints}
      stroke='black'
      strokeWidth={2}
      perfectDrawEnabled={false}
    />
  );
};

export default TileBorder;
