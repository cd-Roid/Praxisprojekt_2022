import React from 'react';
import { Tile as TileProps } from '../../types';
import { useMouse } from '../../hooks/useMouse';
import { Group, Text, Line } from 'react-konva';
import TileBorderAnchor from './TileBorderAnchor';
import { Group as GroupType } from 'konva/lib/Group';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useWebSocketState } from '../../state/WebSocketState';
import { useConnectedTilesState } from '../../state/SyntaxTreeState';
import { useContextMenuState } from '../../state/ContextMenuState';

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
  astNode,
  category,
  textPosition,
}) => {
  const tileRef = React.useRef<GroupType>(null);
  const { handleContextMenu } = useContextMenu();
  const { fromShapeId } = useConnectedTilesState((state) => state);
  const { updateTilePosition, setActiveDragElement, handleClick } = useMouse();
  const setContextMenuOpen = useContextMenuState((state) => state.setContextMenuOpen);
  const userColor = useWebSocketState(
    (state) => state.room?.users?.find((user) => user.userId === state.socket?.id)?.color,
  );

  return (
    <>
      {userColor && id && (
        <>
          {anchors.map((point, index) => (
            <TileBorderAnchor
              id={id}
              key={index}
              x={x + point.x}
              y={y + point.y}
              type={point.type}
              category={category}
              onClick={handleClick}
              fill={fromShapeId === `${id}_${point.type}` ? 'green' : color}
            />
          ))}

          <Group
            x={x}
            y={y}
            id={id}
            draggable
            name={name}
            ref={tileRef}
            data-id={_id}
            data-src={src}
            data-fill={color}
            data-width={width}
            data-height={height}
            data-category={category}
            data-astNode={JSON.stringify(astNode)}
            onDragEnd={updateTilePosition}
            onContextMenu={(e) => handleContextMenu(e, setContextMenuOpen)}
            data-points={JSON.stringify(points)}
            data-anchors={JSON.stringify(anchors)}
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
            <Text text={name} fontSize={18} strokeWidth={1} x={textPosition.x} y={textPosition.y} />
          </Group>
        </>
      )}
    </>
  );
};

export default Tile;
