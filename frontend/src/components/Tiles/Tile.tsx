import React from 'react';
// import useImage from 'use-image';
import { Tile as TileProps } from '../../types';
import { Group, Text, Line } from 'react-konva';
import { useMouse } from '../../hooks/useMouse';
import { Group as GroupType } from 'konva/lib/Group';
import { getTileType } from '../../hooks/useCategory';
import { useContextMenu } from '../../hooks/useContextMenu';

const Tile: React.FC<TileProps> = ({ name, x, y, category, uid }) => {
  const tileRef = React.useRef<GroupType>(null);
  const { rotation, points, textPosition, fill } = getTileType(category);
  const { handleClick, updateTilePosition, setActiveDragElement } = useMouse();
  const { handleContextMenu } = useContextMenu();
  // const [image] = useImage(svgShape);

  return (
    <>
      <Group
        onContextMenu={handleContextMenu}
        ref={tileRef}
        draggable
        x={x}
        y={y}
        id={uid}
        name={category}
        onDragMove={(event) => setActiveDragElement(tileRef, event)}
        onDragEnd={updateTilePosition}
        onMouseOver={(e) => handleClick(e, 4)}
        onMouseLeave={(e) => handleClick(e, 0)}
      >
        <Line fill={fill} stroke='black' closed={true} strokeWidth={0} points={points} />
        <Text
          rotation={rotation}
          text={name}
          x={textPosition.x}
          y={textPosition.y}
          align='center'
          width={120}
          fontSize={24}
          fontStyle={'600'}
        />
      </Group>
    </>
  );
};

export default Tile;
