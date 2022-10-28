import React from 'react';

type MenuProps = {
  name: string;
  category: string;
  svgPath: string;
  fill: string;
  svgRotate: number;
  url: string;
  dragFunction: (event: React.DragEvent) => void;
};

const MenuTile: React.FC<MenuProps> = ({ url, name, category, dragFunction }) => {
  return (
    <img
      data-name={name}
      data-class={category}
      src={url}
      draggable
      onDragStart={dragFunction}
      className='w-[120px] h-[100px] m-2 object-contain'
    />
  );
};

export default MenuTile;
