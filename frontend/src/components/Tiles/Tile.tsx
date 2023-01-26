import React from 'react';
import TileBorder from './TileBorder';
import { Tile as TileProps, Coordinates } from '../../types';
import { useMouse } from '../../hooks/useMouse';
import TileBorderAnchors from './TileBorderAnchors';
import { Group as GroupType } from 'konva/lib/Group';
import { Group, Text, Line, Rect } from 'react-konva';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useWebSocketState } from '../../state/WebSocketState';
import { KonvaEventObject } from 'konva/lib/Node';
import useAnchor from '../../hooks/useAnchor';
import { useBoardState } from '../../state/BoardState';

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

  const hasInterSection = (position: Coordinates, tilePosition: Coordinates) => {
    return !(
      (
        tilePosition.x > position.x ||
        // tilePosition.x + groupSize.width > position.x ||
        tilePosition.y > position.y
      )
      // ||tilePosition.y + groupSize.height > position.y
    );
  };

  const detectConnection = (position: Coordinates) => {
    const intersectingTile: TileProps | undefined = tilesOnBoard.find((tile) => {
      const tilePosition = { x: tile.x, y: tile.y };
      return id !== tile.id && hasInterSection(position, tilePosition);
    });
    if (intersectingTile) {
      console.log('intersectingTile: ', intersectingTile);
      return intersectingTile;
    }
    console.log('no interesction');
    return null;
  };

  const handleAnchorDragStart = (e: KonvaEventObject<DragEvent>) => {
    const position = e.target.position();
    setConnectionPreview(
      <Line
        x={position.x}
        y={position.y}
        points={createConnectionPoints(position, position)}
        stroke='green'
        strokeWidth={4}
      />,
    );
  };

  const handleAnchorDragMove = (e: KonvaEventObject<DragEvent>) => {
    const position = e.target.position();
    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();
    if (pointerPosition) {
      const mousePos = {
        x: pointerPosition.x - position.x,
        y: pointerPosition.y - position.y,
      };
      setConnectionPreview(
        <Line
          x={position.x}
          y={position.y}
          points={createConnectionPoints({ x: 0, y: 0 }, mousePos)}
          stroke='#1E7D73'
          strokeWidth={4}
        />,
      );
    }
  };

  const handleAnchorDragEnd = (e: KonvaEventObject<DragEvent>, id: string) => {
    setConnectionPreview(null);
    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();
    if (pointerPosition) {
      const intersectingTile = detectConnection(pointerPosition);
      if (intersectingTile !== null) {
        setConnections([...connections, { source: id, destination: intersectingTile }]);
      }
    }
  };

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
                  dragStart={handleAnchorDragStart}
                  dragMove={handleAnchorDragMove}
                  dragEnd={handleAnchorDragEnd}
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
