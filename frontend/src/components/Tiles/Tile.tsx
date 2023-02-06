import React from 'react';
import TileBorder from './TileBorder';
import { useLine } from '../../hooks/useLine';
import { Tile as TileProps } from '../../types';
import { useMouse } from '../../hooks/useMouse';
import { Group, Text, Line } from 'react-konva';
import TileBorderAnchors from './TileBorderAnchors';
import { Group as GroupType } from 'konva/lib/Group';
import { useBoardState } from '../../state/BoardState';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useWebSocketState } from '../../state/WebSocketState';
import useAnchor from '../../hooks/useAnchor';

const Tile: React.FC<TileProps> = ({
  x,
  y,
  id,
  _id,
  src,
  name,
  color,
  points,
  category,
  textPosition,
}) => {
  const { getAnchorPoints } = useAnchor();
  const tileRef = React.useRef<GroupType>(null);
  const { handleContextMenu } = useContextMenu();
  const updateTile = useBoardState((state) => state.updateTile);
  const { updateTilePosition, setActiveDragElement } = useMouse();
  const tilesOnBoard = useBoardState((state) => state.tilesOnBoard);
  const [connections, setConnections] = React.useState<
    { source: string; destination: TileProps }[]
  >([]);
  const userColor = useWebSocketState(
    (state) => state.room?.users?.find((user) => user.userId === state.socket?.id)?.color,
  );
  const [groupSize, setGroupSize] = React.useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

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
      const lineEnd = {
        x: toTile.x - fromTile.x,
        y: toTile.y - fromTile.y,
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
  });

  React.useEffect(() => {
    if (tileRef.current) {
      const rect = tileRef.current.getClientRect({
        skipTransform: true,
      });
      setGroupSize({
        width: rect.width,
        height: rect.height,
      });

      const tile = tilesOnBoard.find((tile) => tile.id === id);
      tile &&
        updateTile({
          ...tile,
          anchors: getAnchorPoints(x, y, category, name, groupSize),
          width: rect.width,
          height: rect.height,
        });
    }
  }, []);

  return (
    <>
      {userColor && (
        <>
          {id && (
            <>
              <TileBorder x={x} y={y} id={id} points={points} />
              {getAnchorPoints(x, y, category, name, groupSize)?.map((point, index) => (
                <TileBorderAnchors
                  id={id}
                  x={point.x}
                  y={point.y}
                  key={index}
                  dragStart={(e) => handleAnchorDragStart(e, createConnectionPoints)}
                  dragMove={(e) => handleAnchorDragMove(e, createConnectionPoints)}
                  dragEnd={(e) => handleAnchorDragEnd(e, id, connections, setConnections)}
                />
              ))}
            </>
          )}
          <Group
            onContextMenu={handleContextMenu}
            ref={tileRef}
            draggable
            x={x}
            y={y}
            id={id}
            data-id={_id}
            data-src={src}
            name={category}
            data-fill={color}
            onDragEnd={updateTilePosition}
            data-points={JSON.stringify(points)}
            data-textPosition={JSON.stringify(textPosition)}
            onDragMove={(event) => setActiveDragElement(tileRef, event)}
          >
            <Line
              id={id}
              fill={color}
              stroke={'black'}
              closed={true}
              strokeWidth={0}
              points={points}
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
