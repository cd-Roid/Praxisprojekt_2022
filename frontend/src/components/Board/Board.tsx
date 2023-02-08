import Tile from '../Tiles/Tile';
import React, { useEffect } from 'react';
import { useGrid } from '../../hooks/useGrid';
import { useMouse } from '../../hooks/useMouse';
import { Stage, Layer, Line } from 'react-konva';
import { Stage as StageType } from 'konva/lib/Stage';
import { Layer as LayerType } from 'konva/lib/Layer';
import { SocketDragTile, RoomData } from '../../types';
import { useBoardState } from '../../state/BoardState';
import { useWebSocketState } from '../../state/WebSocketState';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useConnectedTilesState } from '../../state/SyntaxTreeState';

// Main Stage Component that holds the Canvas. Scales based on the window size.

const Board = () => {
  const gridLayer = React.useRef<LayerType>(null);
  const stageRef = React.useRef<StageType>(null);

  const { height, width } = useWindowDimensions();
  const { gridComponents } = useGrid({ stageRef, gridLayer });
  const {
    handleDragOver,
    handleDrop,
    handleWheel,
    handleMouseMove,
    toggleCategory,
    handleBoardDrag,
  } = useMouse();
  const room = useWebSocketState((state) => state.room);
  const addTile = useBoardState((state) => state.addTile);
  const socket = useWebSocketState((state) => state.socket);
  const setRoom = useWebSocketState((state) => state.setRoom);
  const deleteTile = useBoardState((state) => state.removeTile);
  const updateTile = useBoardState((state) => state.updateTile);
  const connections = useConnectedTilesState((state) => state.connections);
  const setStageReference = useBoardState((state) => state.setStageReference);
  const setRemoteDragColor = useBoardState((state) => state.setRemoteDragColor);
  const connectionPreview = useConnectedTilesState((state) => state.connectionPreview);
  setStageReference(stageRef);

  const connectionLines = connections.map((connection) => {
    const [toId, toAnchorType] = connection.to.split('_');
    const [fromId, fromAnchorType] = connection.from.split('_');
    const toTile = room?.tiles?.find((tile) => tile.tile.id === toId);
    const fromTile = room?.tiles?.find((tile) => tile.tile.id === fromId);
    const toAnchor = toTile?.tile.anchors.find((anchor) => anchor.type === toAnchorType);
    const fromAnchor = fromTile?.tile.anchors.find((anchor) => anchor.type === fromAnchorType);

    if (fromTile && toTile && fromAnchor && toAnchor) {
      return (
        <Line
          key={`${fromTile.tile._id}_${toTile.tile._id}`}
          points={[
            fromTile.tile.x + fromAnchor.x,
            fromTile.tile.y + fromAnchor.y,
            toTile.tile.x + toAnchor.x,
            toTile.tile.y + toAnchor.y,
          ]}
          stroke='black'
          strokeWidth={2}
        />
      );
    }
  });
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
          onDragStart={handleBoardDrag}
          onWheel={(e) => handleWheel(e)}
        >
          <Layer ref={gridLayer}>
            {gridComponents}
            {connectionPreview}
            {connectionLines}
            {room?.tiles?.map((tileObject) => (
              <Tile
                key={tileObject.tile.id}
                x={tileObject.tile.x}
                y={tileObject.tile.y}
                _id={tileObject.tile._id}
                id={tileObject.tile.id}
                src={tileObject.tile.src}
                name={tileObject.tile.name}
                anchors={tileObject.tile.anchors}
                color={tileObject.tile.color}
                width={tileObject.tile.width}
                height={tileObject.tile.height}
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