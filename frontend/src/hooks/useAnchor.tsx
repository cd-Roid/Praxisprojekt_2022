import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react';
import { Line } from 'react-konva';

interface Coordinates {
  x: number;
  y: number;
}

const useAnchor = () => {
  const getAnchorPoints = (
    x: number,
    y: number,
    category: string,
    tileName: string,
    groupSize: { width: number; height: number },
  ) => {
    switch (category) {
      case 'Start':
        return [{ x: x + groupSize.width / 2 + 50, y: y - 50 }];
        break;
      case 'Ende':
        return [{ x: x - groupSize.width / 2, y: y - 100 }];
        break;
      case 'Objekte':
        return [
          { x: x - groupSize.width / 5 + 10, y: y - 50 },
          { x: x + groupSize.width - 130, y: y - 50 },
        ];
        break;
      case 'Zustand':
        return [
          { x: x - groupSize.width / 2 - 10, y: y - 100 },
          { x: x + groupSize.width / 2, y: y - 100 },
        ];
      case 'Konditionen':
        if (tileName === 'Dann') {
          return [
            { x: x - groupSize.width / 2, y: y - 50 },
            { x: x + groupSize.width / 2, y: y - 50 },
          ];
        } else {
          if (tileName === 'Und') {
            return [
              { x: x + groupSize.width - 400, y: y - 150 },
              { x: x + groupSize.width / 2 + 40, y: y - 150 },
              { x: x + groupSize.width / 2 + 40, y: y + 150 },
              { x: x + groupSize.width - 400, y: y + 150 },
            ];
          }
        }
        break;
      default:
        console.warn(`Please provide a valid category. Given: ${category}`);
        break;
    }
  };

  const handleAnchorDragStart = (
    e: KonvaEventObject<DragEvent>,
    callback: (value: JSX.Element | null) => void,
    createConnectionPoints: (
      fromPosition: Coordinates,
      toPosition: Coordinates,
    ) => [fx: number, fy: number, tx: number, ty: number],
  ) => {
    const position = e.target.position();
    callback(
      <Line
        x={position.x}
        y={position.y}
        points={createConnectionPoints(position, position)}
        stroke='green'
        strokeWidth={12}
      />,
    );
  };

  const handleAnchorDragMove = (
    e: KonvaEventObject<DragEvent>,
    callback: (value: JSX.Element) => void,
    createConnectionPoints: (
      fromPosition: Coordinates,
      toPosition: Coordinates,
    ) => [fx: number, fy: number, tx: number, ty: number],
  ) => {
    const position = e.target.position();
    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();
    if (pointerPosition) {
      const mousePos = {
        x: pointerPosition.x - position.x,
        y: pointerPosition.y - position.y,
      };
      callback(
        <Line
          x={position.x}
          y={position.y}
          points={createConnectionPoints({ x: 0, y: 0 }, mousePos)}
          stroke='black'
          strokeWidth={2}
        />,
      );
    }
  };

  const handleAnchorDragEnd = (
    e: KonvaEventObject<DragEvent>,
    id: string,
    callback: (value: JSX.Element | null) => void,
  ) => {
    callback(null);
  };

  return { getAnchorPoints, handleAnchorDragStart, handleAnchorDragMove, handleAnchorDragEnd };
};

export default useAnchor;
