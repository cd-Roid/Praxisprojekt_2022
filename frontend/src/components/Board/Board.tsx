import Tile from '../Tiles/Tile';
import React, { useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { useGrid } from '../../hooks/useGrid';
import { useMouse } from '../../hooks/useMouse';
import { Stage as StageType } from 'konva/lib/Stage';
import { Layer as LayerType } from 'konva/lib/Layer';
import { useBoardState } from '../../state/BoardState';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useWebSocketState } from '../../state/WebSocketState';
import { SocketDragTile, UserData, RoomData } from '../../types';

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
  const addUser = useWebSocketState((state) => state.addUser);
  const setRoom = useWebSocketState((state) => state.setRoom);
  const room = useWebSocketState((state) => state.room);
  setStageReference(stageRef);

  useEffect(() => {
    if (socket) {
      socket.on('user-joined', (data: UserData) => {
        addUser({ userId: data.userId, userName: data.userName });
      });

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
            {room?.tiles?.map((tileObject) => (
              <Tile
                src={tileObject.tile.src}
                id={tileObject.tile.id}
                key={tileObject.tile.id}
                category={tileObject.tile.category}
                x={tileObject.tile.x}
                y={tileObject.tile.y}
              />
            ))}
          </Layer>
        </Stage>
      </div>                  
    </main>
  );
};

export default Board;
