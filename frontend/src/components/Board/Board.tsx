import Tile from '../Tiles/Tile';
import React, { useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import TileBorder from '../Tiles/TileBorder';
import { useGrid } from '../../hooks/useGrid';
import { useMouse } from '../../hooks/useMouse';
import { Stage as StageType } from 'konva/lib/Stage';
import { Layer as LayerType } from 'konva/lib/Layer';
import { useBoardState } from '../../state/BoardState';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useWebSocketState } from '../../state/WebSocketState';
import { SocketDragTile, RoomData } from '../../types';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const gridLayer = React.useRef<LayerType>(null);
  const stageRef = React.useRef<StageType>(null);

  const { height, width } = useWindowDimensions();
  const { gridComponents } = useGrid({ stageRef, gridLayer });
  const { handleDragOver, handleDrop, handleWheel, handleMouseMove, toggleCategory } = useMouse();
  const addTile = useBoardState((state) => state.addTile);
  const updateTile = useBoardState((state) => state.updateTile);
  const deleteTile = useBoardState((state) => state.removeTile);
  const setStageReference = useBoardState((state) => state.setStageReference);
  const socket = useWebSocketState((state) => state.socket);
  const setRoom = useWebSocketState((state) => state.setRoom);
  const room = useWebSocketState((state) => state.room);
  const setRemoteDragColor = useBoardState((state) => state.setRemoteDragColor);
  const selectedTile = useBoardState((state) => state.selectedTile);
  setStageReference(stageRef);

  useEffect(() => {
    if (socket) {
      socket?.on('tile-drop', (data: SocketDragTile) => {
        addTile(data.tile);
      });

      socket?.on('tile-drag', (data: SocketDragTile) => {
        updateTile(data.tile);
      });

      socket?.on('tile-delete', (data: string) => {
        deleteTile(data);
      });

      socket?.on('room-data', (data: RoomData) => {
        setRoom(data);
      });

      socket?.on('active-drag-user', (data: string | null) => {
        setRemoteDragColor(data);
      });
    }
  }, [socket]);

  return (
    <main onDrop={(e) => handleDrop(e)} onDragOver={handleDragOver}>
      <div>
        <Stage
          onClick={toggleCategory}
          onMouseMove={handleMouseMove}
          width={width}
          height={height}
          ref={stageRef}
          draggable
          onWheel={(e) => handleWheel(e)}
        >
          <Layer ref={gridLayer}>
            {gridComponents}
            {selectedTile != null && (
              <TileBorder
                key={selectedTile.id}
                tilePosition={{
                  x: selectedTile.x,
                  y: selectedTile.y,
                }}
                id={selectedTile.id}
              />
            )}
            {room?.tiles?.map((tileObject) => (
              <Tile
                key={tileObject.tile.id}
                x={tileObject.tile.x}
                y={tileObject.tile.y}
                id={tileObject.tile.id}
                src={tileObject.tile.src}
                name={tileObject.tile.name}
                color={tileObject.tile.color}
                points={tileObject.tile.points}
                category={tileObject.tile.category}
                textPosition={tileObject.tile.textPosition}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </main>
  );
};

export default Board;
