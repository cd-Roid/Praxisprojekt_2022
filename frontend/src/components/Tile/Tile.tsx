import React from 'react';

type TileProps = {
  name: string;
  category: string;
};

const Tile: React.FC<TileProps> = ({ name, category }) => {
  return <div className={`${category} flex justify-center items-center m-4 `}>{name}</div>;
};

export default Tile;
