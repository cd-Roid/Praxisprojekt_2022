import React from 'react';
import Tile from '../Tiles/Tile';
import { Stage, Layer } from 'react-konva';
import img from '../../assets/images/board.jpg';
import { useMouse } from '../../hooks/useMouse';
import { Stage as StageType } from 'konva/lib/Stage';
import { useBoardState } from '../../state/BoardState';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useContextMenu } from '../../hooks/useContextMenu';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const tileRef = React.useRef<any>(null);
  const stageRef = React.useRef<StageType>(null);
  const { height, width } = useWindowDimensions();
  const tilesOnBoard = useBoardState((state) => state.tilesOnBoard);
  const setStageReference = useBoardState((state) => state.setStageReference);
  setStageReference(stageRef);
  const { handleDragOver, handleDrop, handleWheel } = useMouse();
  const { handleClick } = useContextMenu();

  return (
    <main onDrop={(e) => handleDrop(e)} onDragOver={handleDragOver}>
      <div>
        <Stage
          onClick={handleClick}
          style={{ backgroundImage: `url(${img})` }}
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
                  ref={tileRef}
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
