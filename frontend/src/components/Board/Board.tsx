import React, { useEffect } from 'react';
import Tile from '../Tiles/Tile';
import { Stage, Layer } from 'react-konva';
import img from '../../assets/images/board.jpg';
import { useMouse } from '../../hooks/useMouse';
import { Stage as StageType } from 'konva/lib/Stage';
import { useBoardState } from '../../state/BoardState';
import useWindowDimensions from '../../hooks/useWindowDimensions';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const snapXDistance = 300;
  const tileRef = React.useRef<any>(null);
  const stageRef = React.useRef<StageType>(null);
  const { height, width } = useWindowDimensions();
  const tilesOnBoard = useBoardState((state) => state.tilesOnBoard);
  const activeDragTile = useBoardState((state) => state.activeDragTile);
  const setStageReference = useBoardState((state) => state.setStageReference);
  const clearActiveDragTile = useBoardState((state) => state.clearActiveDragTile);
  setStageReference(stageRef);
  const { handleDragOver, handleDrop, handleWheel } = useMouse();

  useEffect(() => {
    if (
      tileRef.current &&
      activeDragTile?.current &&
      activeDragTile?.current?.id() !== tileRef.current.id() &&
      activeDragTile.current.name() === 'Objects'
    ) {
      if (
        activeDragTile?.current &&
        Math.round(activeDragTile.current.x() - tileRef?.current?.x()) < snapXDistance &&
        Math.round(activeDragTile.current.y() - tileRef?.current?.y()) >= -30 &&
        Math.round(activeDragTile.current.y() - tileRef?.current?.y()) <= 30
      ) {
        const { width } = tileRef.current.getClientRect();

        activeDragTile?.current?.to({
          x: tileRef.current.x() + width,
          y: tileRef.current.y(),
          duration: 0.5,
        });
      }
    } else {
      return;
    }
    clearActiveDragTile();
  }, [activeDragTile]);

  return (
    <main onDrop={(e) => handleDrop(e)} onDragOver={handleDragOver}>
      <div>
        <Stage
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
