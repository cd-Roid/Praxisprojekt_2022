import React from 'react';
import { Tile as TileProps } from '../../types';
import { Group, Image } from 'react-konva';
import { useMouse } from '../../hooks/useMouse';
import { Group as GroupType } from 'konva/lib/Group';
import { useContextMenu } from '../../hooks/useContextMenu';
import useImage from 'use-image';
import { useWebSocketState } from '../../state/WebSocketState';
import { useBoardState } from '../../state/BoardState';

const Tile: React.FC<TileProps> = ({ src, x, y, category, id }) => {
  const tileRef = React.useRef<GroupType>(null);
  const userColor = useWebSocketState(
    (state) => state.room?.users?.find((user) => user.userId === state.socket?.id)?.color,
  );
  const { handleMouseEnL, updateTilePosition, setActiveDragElement } = useMouse();
  const { handleContextMenu } = useContextMenu();
  const [image] = useImage(src);
  const remoteDragColor = useBoardState((state) => state.remoteDragColor);

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
          <Image
            image={image}
            offsetX={image ? image.width / 2 : 0}
            offsetY={image ? image.height / 2 : 0}
            stroke={remoteDragColor ? remoteDragColor : userColor}
            strokeWidth={4}
          />
        </Group>
      )}
    </>
  );
};

export default Tile;
