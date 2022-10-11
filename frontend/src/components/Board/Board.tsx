import React, { useEffect } from 'react';
import Tile from '../Tiles/Tile';
import { Stage, Layer } from 'react-konva';
import { useMouse } from '../../hooks/useMouse';
import { Stage as StageType } from 'konva/lib/Stage';
import { Layer as LayerType } from 'konva/lib/Layer';
import { useBoardState } from '../../state/BoardState';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useGrid } from '../../hooks/useGrid';
import Preview from './Preview';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const gridLayer = React.useRef<LayerType>(null);
  const stageRef = React.useRef<StageType>(null);

  const { height, width } = useWindowDimensions();
  const { gridComponents } = useGrid({ stageRef, gridLayer });
  const tilesOnBoard = useBoardState((state) => state.tilesOnBoard);
  const activeDragTile = useBoardState((state) => state.activeDragTile);
  const setStageReference = useBoardState((state) => state.setStageReference);

  setStageReference(stageRef);
  const { handleDragOver, handleDrop, handleWheel } = useMouse();

  useEffect(() => {
    tilesOnBoard.forEach((tile) => {
      if (activeDragTile?.current && tile.id !== activeDragTile.current.id()) {
        console.log('hm');
      }
    });
  }, [activeDragTile]);

  return (
    <main onDrop={(e) => handleDrop(e)} onDragOver={handleDragOver}>
      <div>
        <Preview layerRef={gridLayer} stageRef={stageRef} />
      </div>
      <div>
        <Stage
          width={width}
          height={height}
          ref={stageRef}
          draggable
          onWheel={(e) => handleWheel(e)}
        >
          <Layer ref={gridLayer}>
            {gridComponents}
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



