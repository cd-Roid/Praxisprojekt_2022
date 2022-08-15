import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { NewNode } from '../../types';
import Tile from '../Tile/Tile';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const { height, width } = useWindowDimensions();
  const [tilesOnBoard, setTilesOnBoard] = useState<NewNode[]>([]);

  const handleDragOver = (event: React.DragEvent) => event.preventDefault();

  const handleDrop = (event: React.DragEvent) => {
    const draggedData = event.dataTransfer.getData('dragStart/Tile');
    console.log(draggedData);
    if (draggedData) {
      const { name, nodeClass, offsetX, offsetY, posX, posY } = JSON.parse(draggedData);
      const newTile: NewNode = {
        name: name,
        category: nodeClass,
        x: posX - offsetX,
        y: posY - offsetY,
      };
      setTilesOnBoard(tilesOnBoard.concat(newTile));
    }
  };
  return (
    <main onDrop={handleDrop} onDragOver={handleDragOver}>
      <Stage width={width} height={height}>
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
    </main>
  );
};

export default Board;

/**
 *    <Stage width={width} height={height}>
        <Layer>
          {tilesOnBoard.map((tile, index) => {
            <Tile key={index} name={tile.name} category={tile.category} />;
          })}
        </Layer>
      </Stage>
 */
