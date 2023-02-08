import React from 'react';
import { Tile as TileProps } from '../../types';
import { useMouse } from '../../hooks/useMouse';
import { Group, Text, Line } from 'react-konva';
import TileBorderAnchor from './TileBorderAnchor';
import { Group as GroupType } from 'konva/lib/Group';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useWebSocketState } from '../../state/WebSocketState';
import { KonvaEventObject } from 'konva/lib/Node';
import { useConnectedTilesState } from '../../state/SyntaxTreeState';

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
  const { fromShapeId, setFromShapeId, connections, setConnections } = useConnectedTilesState(
    (state) => state,
  );
  const userColor = useWebSocketState(
    (state) => state.room?.users?.find((user) => user.userId === state.socket?.id)?.color,
  );

  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    const { id, 'data-type': type } = event.target.attrs;
    console.log('clicked', id);
    if (fromShapeId === null) {
      setFromShapeId(id);
    } else {
      if (fromShapeId !== id) {
        const newConnection = {
          from: `${fromShapeId}_${type}`,
          to: `${id}_${type}`,
        };
        setConnections([...connections, newConnection]);
        setFromShapeId(null);
      }
    }
  };

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
              onClick={handleClick}
              fill={fromShapeId === id ? 'green' : 'black'}
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
            onDragEnd={updateTilePosition}
            onContextMenu={handleContextMenu}
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
    </>
  );
};

export default Tile;
