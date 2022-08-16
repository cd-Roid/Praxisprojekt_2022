import React from 'react';
import { MenuTileProps } from '../../types';

const MenuTile: React.FC<MenuTileProps> = ({ name, category }) => {
  return (
    <>
      <div className={`${category} flex justify-center items-center `}>{name}</div>
    </>
  );
};

export default MenuTile;
