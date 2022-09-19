import Konva from 'konva';
import Tile from '../Tiles/Tile';
import React from 'react';
import { Stage, Layer } from 'react-konva';
import { useBoardState } from '../../state/BoardState';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useMouse } from '../../hooks/useMouse';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const { height, width } = useWindowDimensions();
  const stageRef = React.useRef<Konva.Stage>(null);
  const tilesOnBoard = useBoardState((state) => state.tilesOnBoard);
  const setStageReference = useBoardState((state) => state.setStageReference);
  setStageReference(stageRef);
  const { handleDragOver, handleDrop, handleWheel } = useMouse();

  return (
    <main onDrop={(e) => handleDrop(e)} onDragOver={handleDragOver}>
      <div>
        <Stage
          width={width}
          height={height}
          ref={stageRef}
          draggable
          onWheel={(e) => handleWheel(e)}
        >
          <Layer>
            {tilesOnBoard.map((tile) => {
              return (
                <Tile
                  uid={tile.id}
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
  );
};

export default Board;
