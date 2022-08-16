import Konva from 'konva';
import React, { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { NewNode } from '../../types';
import Tile from '../Tiles/Tile';
import { handleDragOver, handleDrop } from '../../hooks/useDrag';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const { height, width } = useWindowDimensions();
  const [tilesOnBoard, setTilesOnBoard] = useState<NewNode[]>([]);
  const stageRef = React.useRef<Konva.Stage>(null);

  return (
    <main
      onDrop={(e) => handleDrop(e, tilesOnBoard, stageRef, setTilesOnBoard)}
      onDragOver={handleDragOver}
    >
      <div>
        <Stage width={width} height={height} ref={stageRef} draggable>
          <Layer>
            {tilesOnBoard.map((tile, index) => {
              return (
                <Tile key={index} category={tile.category} name={tile.name} x={tile.x} y={tile.y} />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </main>
  );
};

export default Board;
