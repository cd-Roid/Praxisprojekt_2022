import React from 'react';
import Draggable from 'react-draggable';
type TileProps = {
  name: string;
  category: string;
};

const Tile: React.FC<TileProps> = ({ name, category }) => {
  return (
    <Draggable>
      <div className={`${category} flex justify-center items-center m-4 `}>{name}</div>
    </Draggable>
  );
};

export default Tile;
