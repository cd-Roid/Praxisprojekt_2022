import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TileProps = {
  category: string;
  name: string;
  url: string;
  onClickFunc: () => void;
};

const Tile: React.FC<TileProps> = ({ category, name, url, onClickFunc }) => {
  return (
    <div className='m-8 w-56 h84 mt-16 mb-8 border border-black' onClick={onClickFunc}>
      <div className='w-48 mt-8 mb-4 mx-4 h-36 overflow-hidden cursor-pointer '>
        <img className='h-auto m-auto' src={url} alt={name} />
      </div>
      <div className='px-4 cursor-pointer'>
        <div className='font-bold text-xl mb-2'>{name}</div>
        <p className='text-gray-700 text-base'>{category}</p>
      </div>
      <div className=' flex justify-end items-center'>
        <FontAwesomeIcon className='p-4 cursor-pointer text-black' icon={faTrash} />
      </div>
    </div>
  );
};

export default Tile;
