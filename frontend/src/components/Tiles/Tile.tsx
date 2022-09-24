import React from 'react';
import { Tile as TileProps } from '../../types';
import { Group, Text, Line } from 'react-konva';
import { getTileType } from '../../hooks/useCategory';
import { useMouse } from '../../hooks/useMouse';

const Tile: React.FC<TileProps> = ({ name, x, y, category, uid }) => {
  const { updateTilePosition } = useMouse();
  const { fill, points, text } = getTileType(category);
  const { handleClick } = useMouse();

  return (
    <>
      <Group
        draggable
        x={x}
        y={y}
        onDragEnd={updateTilePosition}
        id={uid}
        name={category}
        onMouseOver={(e) => handleClick(e, 4)}
        onMouseLeave={(e) => handleClick(e, 0)}
      >
        <Line fill={fill} stroke='black' closed={true} strokeWidth={0} points={points} />
        <Text text={name} x={text.x} y={text.y} align='center' width={120} fontSize={18} />
      </Group>
    </>
  );
};

export default Tile;
