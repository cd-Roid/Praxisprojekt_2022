import React from 'react';
import { Tile as TileProps } from '../../types';
import { Group, Image, Text, Line } from 'react-konva';
import { useMouse } from '../../hooks/useMouse';
import { Group as GroupType } from 'konva/lib/Group';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useWebSocketState } from '../../state/WebSocketState';
// import useImage from 'use-image';
// import { useBoardState } from '../../state/BoardState';

const Tile: React.FC<TileProps> = ({
  x,
  y,
  id,
  src,
  name,
  color,
  points,
  category,
  textPosition,
}) => {
  const tileRef = React.useRef<GroupType>(null);
  const userColor = useWebSocketState(
    (state) => state.room?.users?.find((user) => user.userId === state.socket?.id)?.color,
  );
  const { handleMouseEnL, updateTilePosition, setActiveDragElement } = useMouse();
  const { handleContextMenu } = useContextMenu();
  // const [image] = useImage(src);
  // const remoteDragColor = useBoardState((state) => state.remoteDragColor);

  // add border to image if active

  return (
    <>
      {userColor && (
        <Group
          onContextMenu={handleContextMenu}
          ref={tileRef}
          draggable
          data-src={src}
          x={x}
          y={y}
          id={id}
          name={category}
          onDragMove={(event) => setActiveDragElement(tileRef, event)}
          onDragEnd={updateTilePosition}
          onMouseOver={(e) => handleMouseEnL(e, 4)}
          onMouseLeave={(e) => handleMouseEnL(e, 0)}
        >
          {/* <Image
            image={image}
            offsetX={image ? image.width / 2 : 0}
            offsetY={image ? image.height / 2 : 0}
            stroke={remoteDragColor ? remoteDragColor : userColor}
            strokeWidth={4}
          /> */}

          <Line fill={color} stroke={color} closed={true} strokeWidth={0} points={points} />
          <Text text={name} fontSize={18} strokeWidth={12} x={textPosition.x} y={textPosition.y} />
        </Group>
      )}
    </>
  );
};

export default Tile;
