import React from 'react';
import Tile from '../Tiles/Tile';
import { Stage, Layer } from 'react-konva';
import { useMouse } from '../../hooks/useMouse';
import { Stage as StageType } from 'konva/lib/Stage';
import { useBoardState } from '../../state/BoardState';
import useWindowDimensions from '../../hooks/useWindowDimensions';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const { height, width } = useWindowDimensions();
  const stageRef = React.useRef<StageType>(null);
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
