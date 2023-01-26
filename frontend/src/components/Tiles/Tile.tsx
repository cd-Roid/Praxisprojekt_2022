import React from 'react';
import TileBorder from './TileBorder';
import useAnchor from '../../hooks/useAnchor';
import { useLine } from '../../hooks/useLine';
import { Tile as TileProps } from '../../types';
import { useMouse } from '../../hooks/useMouse';
import { Group, Text, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import TileBorderAnchors from './TileBorderAnchors';
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
  points,
  category,
  textPosition,
}) => {
  const { getAnchorPoints } = useAnchor();

  const [showBorder, setShowBoarder] = React.useState<boolean>(false);
  const tileRef = React.useRef<GroupType>(null);
  const { handleContextMenu } = useContextMenu();
  const { handleMouseEnL, updateTilePosition, setActiveDragElement } = useMouse();
  const tilesOnBoard = useBoardState((state) => state.tilesOnBoard);
  const [connectionPreview, setConnectionPreview] = React.useState<JSX.Element | null>(null);
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

  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    setShowBoarder(!showBorder);
    if (tileRef.current) {
      const rect = event.currentTarget.getClientRect({
        skipTransform: true,
      });
      setGroupSize({
        width: rect.width,
        height: rect.height,
      });
    }
  };

  return (
    <>
      {userColor && (
        <>
          {showBorder && id && (
            <>
              <TileBorder x={x} y={y} id={id} points={points} />
              {getAnchorPoints(x, y, category, name, groupSize)?.map((point, index) => (
                <TileBorderAnchors
                  id={id}
                  x={point.x}
                  y={point.y}
                  key={index}
                  dragStart={(e) =>
                    handleAnchorDragStart(e, createConnectionPoints, setConnectionPreview)
                  }
                  dragMove={(e) =>
                    handleAnchorDragMove(e, createConnectionPoints, setConnectionPreview)
                  }
                  dragEnd={(e) =>
                    handleAnchorDragEnd(e, id, connections, setConnections, setConnectionPreview)
                  }
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
            onClick={(event) => handleClick(event)}
            data-textPosition={JSON.stringify(textPosition)}
            onDragMove={(event) => setActiveDragElement(tileRef, event)}
            onMouseOver={(event) => handleMouseEnL(event, showBorder, 4)}
            onMouseLeave={(event) => handleMouseEnL(event, showBorder, 0)}
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
      {connectionPreview}
      {connectionObjs}
    </>
  );
};


export default Tile;
