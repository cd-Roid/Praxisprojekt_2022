import React from 'react';
import { Line } from 'react-konva';

type Props = {
  x: number;
  y: number;
  points?: number[];
  id: string;
};

const TileBorder: React.FC<Props> = ({ x, y, id, points }) => {
  const defaultPoints = [0, 0, 100, 0, 100, 100, 0, 100, 0, 0];

  return (
    <Line
      id={id}
      x={x}
      y={y}
      points={points || defaultPoints}
      stroke='black'
      strokeWidth={12}
      perfectDrawEnabled={false}
      closed
    />
  );
};

export default TileBorder;
