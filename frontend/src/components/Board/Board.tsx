import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import React, { useState, useRef, useEffect, LegacyRef } from 'react';
import { Stage, Layer, Line, Group, Text, RegularPolygon } from 'react-konva';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { NewNode } from '../../types';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const textRef = useRef<Konva.Text>();
  const [size, setSize] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    if (textRef.current != undefined) {
      setSize({
        x: textRef.current.width(),
        y: textRef.current.height(),
      });
    }
  }, []);

  const { height, width } = useWindowDimensions();
  const [tilesOnBoard, setTilesOnBoard] = useState<NewNode[]>([]);
  const [cursorPos, setCursorPos] = useState<Vector2d | null>();
  const stageRef = React.useRef<Konva.Stage>(null);
  const handleDragOver = (event: React.DragEvent) => event.preventDefault();

  const handleDrop = (event: React.DragEvent) => {
    const draggedData = event.dataTransfer.getData('dragStart/Tile');
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
        console.log(offsetX, offsetY);
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
                <Group draggable key={index} x={tile.x} y={tile.y}>
                  <RegularPolygon
                    x={0}
                    y={0}
                    width={size.x}
                    height={size.y}
                    sides={6}
                    radius={70}
                    fill='red'
                    stroke='black'
                    strokeWidth={4}
                  />
                  <Text text={tile.name} x={0} y={0} ref={textRef as any} />
                </Group>
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
