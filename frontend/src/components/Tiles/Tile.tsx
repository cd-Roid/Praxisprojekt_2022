import React from 'react';
import { Tile as TileProps } from '../../types';
import { Group, Text, Line } from 'react-konva';
import { Group as GroupType } from 'konva/lib/Group';
import { getTileType } from '../../hooks/useCategory';
import { useMouse } from '../../hooks/useMouse';

const Tile: React.FC<TileProps> = ({ name, x, y, category, uid }) => {
  const { updateTilePosition } = useMouse();
  const tileRef = React.useRef<GroupType>(null);
  const { fill, points, text } = getTileType(category);
  const { handleClick, setActiveDragElement } = useMouse();
  /**
     *     if (
      tileRef.current &&
      activeDragTile?.current &&
      activeDragTile?.current?.id() !== tileRef.current.id() &&
      activeDragTile.current.name() === 'Objects'
    ) {
      if (
        activeDragTile?.current &&
        Math.round(activeDragTile.current.x() - tileRef?.current?.x()) < snapXDistance &&
        Math.round(activeDragTile.current.y() - tileRef?.current?.y()) >= -30 &&
        Math.round(activeDragTile.current.y() - tileRef?.current?.y()) <= 30
      ) {
        const { width } = tileRef.current.getClientRect();

        activeDragTile?.current?.to({
          x: tileRef.current.x() + width,
          y: tileRef.current.y(),
          duration: 0.5,
        });
      }
    } else {
      return;
    }
    clearActiveDragTile();
     */
  return (
    <>
      <Group
        ref={tileRef}
        draggable
        x={x}
        y={y}
        id={uid}
        name={category}
        onDragMove={() => setActiveDragElement(tileRef)}
        onDragEnd={updateTilePosition}
        onMouseOver={(e) => handleClick(e, 4)}
        onMouseLeave={(e) => handleClick(e, 0)}
      >
        <Line fill={fill} stroke='black' closed={true} strokeWidth={0} points={points} />
        <Text
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
