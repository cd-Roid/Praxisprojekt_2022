import React from 'react';
import { Line } from 'react-konva';
import { Circle as CircleObject } from 'konva/lib/shapes/Circle';
import { KonvaEventObject } from 'konva/lib/Node';
import Category from '../Sidebar/Category';

type Props = {
  x: number;
  y: number;
  id: string;
  fill: string;
  type: string;
  category?: string;
  onClick: (event: KonvaEventObject<MouseEvent>) => void;
};

const TileBorderAnchors: React.FC<Props> = ({ x, y, id, onClick, fill, type, category }) => {
  const dragBounds = (ref: React.RefObject<CircleObject>) => {
    if (ref.current !== null) {
      return ref.current.getAbsolutePosition();
    }
    return {
      x: 0,
      y: 0,
    };
  };

  const directionalArrows = [
    [-10, 0, 25, 0, 50, 15, 25, 30, 0, 30, -10, 0],
    [20, 0, -50, 0, -25, 15, -50, 30, 35, 30, 30, 0],
  ];

  const anchor = React.useRef(null);
  return (
    <>
      {type === 'L' || type === 'BL' || type === 'TL' ? (
        <Line
          width={25}
          height={25}
          x={x}
          y={y}
          id={id}
          fill={fill}
          closed={true}
          strokeWidth={0}
          draggable
          data-type={type}
          onClick={onClick}
          perfectDrawEnabled={false}
          points={directionalArrows[1]}
          dragBoundFunc={() => dragBounds(anchor)}
          stroke={'black'}
        />
      ) : (
        <Line
          x={x}
          y={y}
          width={25}
          height={25}
          id={id}
          fill={fill}
          closed={true}
          strokeWidth={0}
          draggable
          data-type={type}
          onClick={onClick}
          perfectDrawEnabled={false}
          points={directionalArrows[0]}
          dragBoundFunc={() => dragBounds(anchor)}
          stroke={'black'}
        />
      )}
    </>
  );
};

export default TileBorderAnchors;

