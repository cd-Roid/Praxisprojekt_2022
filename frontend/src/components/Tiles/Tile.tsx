import React from 'react';
import { Tile as TileProps } from '../../types';
import { Group, Image } from 'react-konva';
import { useMouse } from '../../hooks/useMouse';
import { Group as GroupType } from 'konva/lib/Group';
import { useContextMenu } from '../../hooks/useContextMenu';
import useImage from 'use-image';

const Tile: React.FC<TileProps> = ({ url, x, y, category, uid }) => {
  const tileRef = React.useRef<GroupType>(null);
  const { handleMouseEnL, updateTilePosition, setActiveDragElement } = useMouse();
  const { handleContextMenu } = useContextMenu();
  const [image] = useImage(url);

  return (
    <>
      <Group
        onContextMenu={handleContextMenu}
        ref={tileRef}
        draggable
        data-src={url}
        x={x}
        y={y}
        id={uid}
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
        />
      </Group>
    </>
  );
};

export default Tile;
