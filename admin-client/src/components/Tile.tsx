import React from 'react';

type TileProps = {
  category: string;
  name: string;
  src: string;
  onClickFunc: () => void;
};

const Tile: React.FC<TileProps> = ({ category, name, src, onClickFunc }) => {
  return (
    <div className='m-8 w-56 h84 mt-16 mb-8 border border-black' onClick={onClickFunc}>
      <div className='w-48 mt-8 mb-4 mx-4 h-36 overflow-hidden cursor-pointer '>
        <img className='h-auto m-auto object-contain' src={src} alt={name} />
      </div>
      <div className='px-4 cursor-pointer'>
        <div className='font-bold text-xl mb-2'>{name}</div>
        <p className='text-gray-700 text-base pb-4'>{category}</p>
      </div>
    </div>
  );
};

export default Tile;
