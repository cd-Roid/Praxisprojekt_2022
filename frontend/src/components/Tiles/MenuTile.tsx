import React from 'react';
import { MenuTileProps } from '../../types';

const MenuTile: React.FC<MenuTileProps> = ({ name, category }) => {
  return (
    <>
      <div className={`${category} flex justify-center items-center font-semibold `}>{name}</div>
    </>
  );
};

export default MenuTile;
