import React from 'react';

type MenuProps = {
  name: string;
  category: string;
  src: string;
  dragFunction: (event: React.DragEvent) => void;
};

const MenuTile: React.FC<MenuProps> = ({ src, name, category, dragFunction }) => {
  return (
    <img
      data-name={name}
      data-class={category}
      src={src}
      draggable
      onDragStart={dragFunction}
      className=' m-2 object-contain'
    />
  );
};

export default MenuTile;
