import React from 'react';
import { Tile as TileProps } from '../types/apiTypes';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tile: React.FC<TileProps> = ({ category, name, file }) => {
  return (
    <div className='m-8 w-72'>
      <div className='min-w-sm rounded overflow-hidden shadow-lg'>
        <div className='mx-auto w-32 h-36 overflow-hidden cursor-pointer'>
          <img src={file} alt='Mountain' />
        </div>
        <div className='px-6 py-4 cursor-pointer'>
          <div className='font-bold text-xl mb-2'>{name}</div>
          <p className='text-gray-700 text-base'>{category}</p>
        </div>
        <div className='px-6 pt-4 pb-2 flex justify-end items-center h-full w-full'>
          <FontAwesomeIcon className='p-4 cursor-pointer text-black' icon={faTrash} />
        </div>
      </div>
    </div>
  );
};

export default Tile;
