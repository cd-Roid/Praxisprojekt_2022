import React from 'react';
import TileBorder from './TileBorder';
import { useLine } from '../../hooks/useLine';
import { Tile as TileProps } from '../../types';
import { useMouse } from '../../hooks/useMouse';
import { Group, Text, Line, Circle } from 'react-konva';
import TileBorderAnchor from './TileBorderAnchor';
import { Group as GroupType } from 'konva/lib/Group';
import { useBoardState } from '../../state/BoardState';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useWebSocketState } from '../../state/WebSocketState';

const Tile: React.FC<TileProps> = ({
  x,
  y,
  id,
  _id,
  src,
  name,
  color,
  width,
  height,
  points,
  anchors,
  category,
  textPosition,
}) => {
  const tileRef = React.useRef<GroupType>(null);
  const { handleContextMenu } = useContextMenu();
  const { updateTilePosition, setActiveDragElement } = useMouse();
  const tilesOnBoard = useBoardState((state) => state.tilesOnBoard);
  const [connections, setConnections] = React.useState<
    { source: string; destination: TileProps; destinationAnchorType: string }[]
  >([]);
  const userColor = useWebSocketState(
    (state) => state.room?.users?.find((user) => user.userId === state.socket?.id)?.color,
  );

  const createConnectionPoints = (
    source: { x: number; y: number },
    destination: { x: number; y: number },
  ) => {
    return [source.x, source.y, destination.x, destination.y];
  };

  const { handleAnchorDragStart, handleAnchorDragMove, handleAnchorDragEnd } = useLine();

  const connectionObjs = connections.map((connection) => {
    const fromTile = tilesOnBoard.find((tile) => tile.id === connection.source);
    const toTile = tilesOnBoard.find((tile) => tile.id === connection.destination.id);
    if (fromTile && toTile) {
      const toTileAnchor = toTile.anchors?.find(
        (anchor) => anchor.type === connection.destinationAnchorType,
      );
      if (toTileAnchor) {
        const lineEnd = {
          x: toTileAnchor.x - fromTile.x,
          y: toTileAnchor.y - fromTile.y,
        };
        const points = createConnectionPoints({ x: 0, y: 0 }, lineEnd);
        return (
          <Line
            key={`from-${id}-to-${toTile.id}`}
            x={fromTile.x}
            y={fromTile.y}
            points={points}
            stroke='#1E7D73'
            strokeWidth={5}
          />
        );
      }
    }
  });
  return (
    <>
      {userColor && id && (
        <>
          {id && (
            <>
              <TileBorder x={x} y={y} id={id} points={points} />
              {anchors.map((point, index) => (
                <TileBorderAnchor
                  id={id}
                  key={index}
                  x={x + point.x}
                  y={y + point.y}
                  type={point.type}
                  dragMove={(e) => handleAnchorDragMove(e, createConnectionPoints)}
                  dragStart={(e) => handleAnchorDragStart(e, createConnectionPoints)}
                  dragEnd={(e) => handleAnchorDragEnd(e, id, connections, setConnections)}
                />
              ))}
            </>
          )}

          <Group
            x={x}
            y={y}
            id={id}
            draggable
            ref={tileRef}
            data-id={_id}
            data-src={src}
            name={category}
            data-fill={color}
            data-width={width}
            data-height={height}
            onDragEnd={updateTilePosition}
            onContextMenu={handleContextMenu}
            data-points={JSON.stringify(points)}
            data-textPosition={JSON.stringify(textPosition)}
            onDragMove={(event) => setActiveDragElement(tileRef, event)}
          >
            <Line
              id={id}
              fill={color}
              closed={true}
              strokeWidth={0}
              points={points}
              stroke={'black'}
            />
            <Text
              text={name}
              fontSize={18}
              strokeWidth={12}
              x={textPosition.x}
              y={textPosition.y}
            />
          </Group>
        </>
      )}

      {connectionObjs}
    </>
  );
};


export default Tile;
