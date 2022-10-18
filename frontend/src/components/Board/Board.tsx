import Tile from '../Tiles/Tile';
import React, { useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { useGrid } from '../../hooks/useGrid';
import { useMouse } from '../../hooks/useMouse';
import { Stage as StageType } from 'konva/lib/Stage';
import { Layer as LayerType } from 'konva/lib/Layer';
import { useBoardState } from '../../state/BoardState';
import { useContextMenu } from '../../hooks/useContextMenu';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useWebSocketState } from '../../state/WebSocketState';
import { NewNode, SocketDragTile } from '../../types';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const gridLayer = React.useRef<LayerType>(null);
  const stageRef = React.useRef<StageType>(null);
  const { height, width } = useWindowDimensions();
  const { gridComponents } = useGrid({ stageRef, gridLayer });
  const tilesOnBoard = useBoardState((state) => state.tilesOnBoard);
  const addTile = useBoardState((state) => state.addTile);
  const updateTile = useBoardState((state) => state.updateTile);
  // const activeDragTile = useBoardState((state) => state.activeDragTile);
  const setStageReference = useBoardState((state) => state.setStageReference);
  const socket = useWebSocketState((state) => state.socket);
  setStageReference(stageRef);
  const { handleDragOver, handleDrop, handleWheel, handleMouseMove } = useMouse();
  const { handleClick } = useContextMenu();

  useEffect(() => {
    if (socket) {
      socket?.on('tile-drop', (data) => {
        if (data.remoteUser !== socket.id) {
          addTile(data.tile);
        }
      });

      socket?.on('tile-drag', (data) => {
        if (data.remoteUser !== socket.id) {
          updateTile(data.tile);
        }
      });
    }
  }, [socket]);

  return (
    <main onDrop={(e) => handleDrop(e)} onDragOver={handleDragOver}>
      <div>
        <Stage
          onMouseMove={handleMouseMove}
          onClick={handleClick}
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
