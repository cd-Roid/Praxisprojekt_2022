import React from 'react';
import { Tile as TileProps } from '../../types';
import { Group as GroupType } from 'konva/lib/Group';
import { Group, Text, Line } from 'react-konva';
import { getTileType } from '../../hooks/useCategory';
import { useMouse } from '../../hooks/useMouse';
import { useContextMenu } from '../../hooks/useContextMenu';

const Tile: React.FC<TileProps> = ({ name, x, y, category, uid }) => {
  const tileRef = React.useRef<GroupType>(null);
  const { fill, points, text, rotation } = getTileType(category);
  const { handleClick, updateTilePosition } = useMouse();
  const { handleContextMenu } = useContextMenu();

  return (
    <>
      <Group
        onContextMenu={handleContextMenu}
        ref={tileRef}
        draggable
        x={x}
        y={y}
        onDragMove={(e) => updateTilePosition(e)}
        id={uid}
        name={category}
        onMouseOver={(e) => handleClick(e, 4)}
        onMouseLeave={(e) => handleClick(e, 0)}
      >
        <Line fill={fill} stroke='black' closed={true} strokeWidth={0} points={points} />
        <Text
          rotation={rotation}
          text={name}
          x={text.x}
          y={text.y}
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
