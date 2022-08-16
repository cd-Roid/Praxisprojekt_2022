/* eslint-disable @typescript-eslint/no-explicit-any */
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Group, Text, RegularPolygon } from 'react-konva';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { NewNode } from '../../types';
import Tile from '../Tiles/Tile';

// Main Stage Component that holds the Canvas. Scales based on the window size.

// TODO: move all Shape Logic to own File
// TODO: maybe move drag Logic to own hook

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
                <Tile
                  key={index}
                  category={tile.category}
                  name={tile.name}
                  sizeX={size.x}
                  sizeY={size.y}
                  textRef={textRef}
                  x={tile.x}
                  y={tile.y}
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

