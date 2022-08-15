import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { NewNode } from '../../types';
import Tile from '../Tile/Tile';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const { height, width } = useWindowDimensions();
  const [tilesOnBoard, setTilesOnBoard] = useState<NewNode[]>([]);
  const [cursorPos, setCursorPos] = useState<Vector2d | null>();
  const stageRef = React.useRef<Konva.Stage>(null);
  const handleDragOver = (event: React.DragEvent) => event.preventDefault();

  const handleDrop = (event: React.DragEvent) => {
    const draggedData = event.dataTransfer.getData('dragStart/Tile');
    console.log(cursorPos?.x, cursorPos?.y);
    console.log(draggedData);
    if (draggedData && stageRef.current != null) {
      stageRef.current.setPointersPositions(event);
      const coordinates = stageRef.current.getPointerPosition();
      const { name, nodeClass, offsetX, offsetY } = JSON.parse(draggedData);
      if (coordinates != undefined) {
        const newTile: NewNode = {
          name: name,
          category: nodeClass,
          x: coordinates?.x - offsetX,
          y: coordinates?.y - offsetY,
        };
        setTilesOnBoard(tilesOnBoard.concat(newTile));
      }
    }
  };
  const handleMouseMove = () => {
    if (stageRef.current != null) {
      setCursorPos(stageRef.current.getPointerPosition());
    }
  };

  return (
    <main onDrop={handleDrop} onDragOver={handleDragOver} onMouseMove={handleMouseMove}>
      <div>
        {cursorPos?.x},{cursorPos?.y}
        <Stage width={width} height={height} ref={stageRef}>
          <Layer>
            {tilesOnBoard.map((tile, index) => {
              return (
                <Line
                  key={index}
                  draggable
                  x={tile.x}
                  y={tile.y}
                  points={[0, 0, 100, 0, 100, 100]}
                  tension={0.5}
                  closed
                  stroke='black'
                  fillLinearGradientStartPoint={{ x: -50, y: -50 }}
                  fillLinearGradientEndPoint={{ x: 50, y: 50 }}
                  fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </main>
  );
};

export default Board;

/**
 *     <Stage width={width} height={height}>
        <Layer>
          {tilesOnBoard.map((tile, index) => {
            <Line
              draggable
              x={tile.x}
              y={tile.y}
              points={[0, 0, 100, 0, 100, 100]}
              tension={0.5}
              closed
              stroke='black'
              fillLinearGradientStartPoint={{ x: -50, y: -50 }}
              fillLinearGradientEndPoint={{ x: 50, y: 50 }}
              fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
            />;
          })}
        </Layer>
      </Stage>
 */
