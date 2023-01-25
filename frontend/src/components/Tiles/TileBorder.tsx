import React from 'react';
import { Line } from 'react-konva';

type Props = {
  x: number;
  y: number;
  points?: number[];
  id: string;
};

const TileBorder: React.FC<Props> = ({ x, y, id, points }) => {
  const SIZE = 50;
  const defaultPoints = [0, 0, SIZE, 0, SIZE, SIZE, 0, SIZE, 0, 0];

  return (
    <Line
      id={id}
      x={x}
      y={y}
      points={points || defaultPoints}
      stroke='green'
      strokeWidth={12}
      perfectDrawEnabled={false}
      closed
    />
  );
};

export default TileBorder;
