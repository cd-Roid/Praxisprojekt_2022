import React from 'react';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CursorProps = {
  userName?: string;
  x: number;
  y: number;
};

const Cursor: React.FC<CursorProps> = ({ userName, x, y }) => {
  return (
    <div
      style={{ left: Math.floor(x), top: Math.floor(y) }}
      className='absolute flex z-50 top-0 left-0'
    >
      <FontAwesomeIcon className='w-4 h-4 pb-6 text-dark' icon={faArrowPointer} />
      <p className='font-medium'>{userName}</p>
    </div>
  );
};

export default Cursor;
