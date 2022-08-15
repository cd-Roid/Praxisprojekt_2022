import React from 'react';
import { Tile as TileProps } from '../../types';

const Tile: React.FC<TileProps> = ({ name, category, customClass }) => {
  return (
    <>
      <div className={`${category} flex justify-center items-center ${customClass} `}>{name}</div>
    </>
  );
};

export default Tile;
