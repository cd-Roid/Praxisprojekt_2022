import { CursorData, NewNode } from '../../types';
import React, { useState, useEffect } from 'react';
import { useWebSockets } from '../../hooks/useWebSockets';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/** type CursorProps = {
  x: number;
  y: number;
};**/

const Cursor: React.FC = () => {
  const { currentSocket, socketId } = useWebSockets();
  const [draggingTile, setDraggingTile] = useState<NewNode | null>(null);
  const [cursorData, setCursorData] = useState<CursorData>({ x: 0, y: 0 });

  useEffect(() => {
    currentSocket?.on('node-dragging', (data: NewNode) => setDraggingTile(data));
    currentSocket?.on('cursor', (data: CursorData) => setCursorData(data));
  }, [currentSocket]);

  return (
    <>
      {currentSocket && currentSocket.id != socketId && (
        <div
          style={{ left: Math.floor(cursorData.x), top: Math.floor(cursorData.y) }}
          className=' absolute z-50 top-0 left-0'
        >
          <FontAwesomeIcon className='w-6 h-6' icon={faArrowPointer} />
          {currentSocket.id}
        </div>
      )}
    </>
  );
};

export default Cursor;
