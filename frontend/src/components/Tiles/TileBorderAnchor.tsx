import React from 'react';
import { Circle } from 'react-konva';
import { Circle as CircleObject } from 'konva/lib/shapes/Circle';
import { KonvaEventObject } from 'konva/lib/Node';

type Props = {
  x: number;
  y: number;
  id: string;
  type: string;
  dragStart: (e: KonvaEventObject<DragEvent>) => void;
  dragMove: (e: KonvaEventObject<DragEvent>) => void;
  dragEnd: (e: KonvaEventObject<DragEvent>, id: string) => void;
};

const TileBorderAnchors: React.FC<Props> = ({ x, y, id, dragStart, dragMove, dragEnd, type }) => {
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
      <Circle
        x={x}
        y={y}
        id={id}
        draggable
        radius={10}
        fill='black'
        data-type={type}
        onDragStart={dragStart}
        onDragMove={dragMove}
        onDragEnd={(event) => dragEnd(event, id)}
        dragBoundFunc={() => dragBounds(anchor)}
        perfectDrawEnabled={false}
        ref={anchor}
      />
    </>
  );
};

export default TileBorderAnchors;
