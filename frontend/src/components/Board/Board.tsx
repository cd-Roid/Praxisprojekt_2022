import Konva from 'konva';
import Tile from '../Tiles/Tile';
import { NewNode } from '../../types';
import React, { useContext, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { BoardContext } from '../../contexts/BoardContext';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useMouse } from '../../hooks/useMouse';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const { height, width } = useWindowDimensions();
  const [tiles, setTiles] = useState<NewNode[]>([]);
  const stageRef = React.useRef<Konva.Stage>(null);
  const contextRef = useContext(BoardContext).stageReference;
  const { handleDragOver, handleDrop, handleWheel } = useMouse();

  return (
    <BoardContext.Provider
      value={{
        tilesOnBoard: tiles,
        updateBoard: setTiles,
        stageReference: stageRef,
      }}
    >
      <main onDrop={(e) => handleDrop(e, tiles, setTiles)} onDragOver={handleDragOver}>
        <div>
          <Stage
            width={width}
            height={height}
            ref={contextRef}
            draggable
            onWheel={(e) => handleWheel(e)}
          >
            <Layer>
              {tiles.map((tile) => {
                return (
                  <Tile
                    key={tile.id}
                    category={tile.category}
                    name={tile.name}
                    x={tile.x}
                    y={tile.y}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
      </main>
    </BoardContext.Provider>
  );
};

export default Board;
