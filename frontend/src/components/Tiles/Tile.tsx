import React from 'react';
import { Tile as TileProps } from '../../types';
import { Group, Text, RegularPolygon } from 'react-konva';

const Tile: React.FC<TileProps> = ({ name, x, y, sizeX, sizeY, textRef }) => {
  return (
    <>
      <Group draggable x={x} y={y}>
        <RegularPolygon
          x={0}
          y={0}
          width={sizeX}
          height={sizeY}
          sides={6}
          radius={70}
          fill='red'
          stroke='black'
          strokeWidth={4}
        />
        <Text text={name} x={0} y={0} ref={textRef} />
      </Group>
    </>
  );
};

export default Tile;
