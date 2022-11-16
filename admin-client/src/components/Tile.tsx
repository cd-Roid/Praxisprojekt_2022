import React from 'react';
import { Tile as TileProps } from '../types/apiTypes';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tile: React.FC<TileProps> = ({ category, name, file }) => {
  return (
    <div className='p-8 w-80'>
      <div className='min-w-sm rounded overflow-hidden shadow-lg'>
        <div className='mx-auto w-32 h-36 overflow-hidden'>
          <img src={file} alt='Mountain' />
        </div>
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{name}</div>
          <p className='text-gray-700 text-base'>{category}</p>
        </div>
        <div className='px-6 pt-4 pb-2 flex justify-end items-center h-full w-full'>
          <FontAwesomeIcon className='p-4' icon={faPen} />
          <FontAwesomeIcon className='p-4' icon={faTrash} />
        </div>
      </div>
    </div>
  );
};

export default Tile;
