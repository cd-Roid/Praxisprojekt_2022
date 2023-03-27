import React from 'react';
import { Rect } from 'react-konva';
import { Circle as CircleObject } from 'konva/lib/shapes/Circle';
import { KonvaEventObject } from 'konva/lib/Node';

type Props = {
  x: number;
  y: number;
  id: string;
  fill: string;
  type: string;
  onClick: (event: KonvaEventObject<MouseEvent>) => void;
};

const TileBorderAnchors: React.FC<Props> = ({ x, y, id, onClick, fill, type }) => {
  const dragBounds = (ref: React.RefObject<CircleObject>) => {
    if (ref.current !== null) {
      return ref.current.getAbsolutePosition();
    }
    return {
      x: 0,
      y: 0,
    };
  };

  const anchor = React.useRef(null);
  return (
    <>
      <Rect
        x={x}
        y={y}
        width={25}
        height={25}
        fill={fill}
        id={id}
        draggable
        ref={anchor}
        name='anchor'
        data-type={type}
        onClick={onClick}
        perfectDrawEnabled={false}
        dragBoundFunc={() => dragBounds(anchor)}
      />
    </>
  );
};

export default TileBorderAnchors;
