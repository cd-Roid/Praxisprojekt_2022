import Tile from '../Tiles/Tile';
import React, { useEffect } from 'react';
import { useGrid } from '../../hooks/useGrid';
import { useMouse } from '../../hooks/useMouse';
import { Stage, Layer, Line } from 'react-konva';
import { Stage as StageType } from 'konva/lib/Stage';
import { Layer as LayerType } from 'konva/lib/Layer';
import { SocketDragTile, RoomData } from '../../types';
import { useBoardState } from '../../state/BoardState';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useWebSocketState } from '../../state/WebSocketState';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useContextMenuState } from '../../state/ContextMenuState';
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
    toggleCategory,
    handleMouseMove,
    handleBoardDrag,
  } = useMouse();
  const { handleContextMenu } = useContextMenu();
  const room = useWebSocketState((state) => state.room);
  const addTile = useBoardState((state) => state.addTile);
  const socket = useWebSocketState((state) => state.socket);
  const setRoom = useWebSocketState((state) => state.setRoom);
  const deleteTile = useBoardState((state) => state.removeTile);
  const updateTile = useBoardState((state) => state.updateTile);
  const setStageReference = useBoardState((state) => state.setStageReference);
  const setRemoteDragColor = useBoardState((state) => state.setRemoteDragColor);
  const connectionPreview = useConnectedTilesState((state) => state.connectionPreview);

  const setLineContextMenuOpen = useContextMenuState((state) => state.setLineContextMenuOpen);
  setStageReference(stageRef);

  const connectionLines = room?.tileConnections?.map((connection) => {
    const [toId, toAnchorType] = connection.to.split('_');
    const [fromId, fromAnchorType] = connection.from.split('_');
    const toTile = room?.tiles?.find((tile) => tile.tile.id === toId);
    const fromTile = room?.tiles?.find((tile) => tile.tile.id === fromId);
    const toAnchor = toTile?.tile.anchors.find((anchor) => anchor.type === toAnchorType);
    const fromAnchor = fromTile?.tile.anchors.find((anchor) => anchor.type === fromAnchorType);

    if (fromTile && toTile && fromAnchor && toAnchor) {
      return (
        <Line
          onContextMenu={(e) => handleContextMenu(e, setLineContextMenuOpen)}
          id={`${fromId}_${fromAnchorType}.${toId}_${toAnchorType}`}
          key={`${fromId}_${fromAnchorType}.${toId}_${toAnchorType}`}
          points={[
            fromTile.tile.x + fromAnchor.x,
            fromTile.tile.y + fromAnchor.y,
            toTile.tile.x + toAnchor.x,
            toTile.tile.y + toAnchor.y,
          ]}
          stroke='black'
          strokeWidth={6}
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
          width={width * (2.5 / 3)}
          height={height}
          ref={stageRef}
          draggable
          className='border border-black'
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
                id={tileObject.tile.id}
                _id={tileObject.tile._id}
                src={tileObject.tile.src}
                name={tileObject.tile.name}
                color={tileObject.tile.color}
                width={tileObject.tile.width}
                points={tileObject.tile.points}
                height={tileObject.tile.height}
                anchors={tileObject.tile.anchors}
                astNode={tileObject.tile.astNode}
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