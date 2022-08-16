import React from 'react';
import { Tile as TileProps } from '../../types';
import { Group, Text, Line } from 'react-konva';
import { getTileType } from '../../hooks/useCategory';

const Tile: React.FC<TileProps> = ({ name, x, y, category }) => {
  const { fill, points, text } = getTileType(category);
  return (
    <>
      <Group draggable x={x} y={y}>
        <Line fill={fill} stroke='black' closed={true} strokeWidth={0} points={points} />
        <Text text={name} x={text.x} y={text.y} />
      </Group>
    </>
  );
};

export default Tile;
