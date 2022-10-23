import { CursorData } from '../../types';
import React, { useState, useEffect } from 'react';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWebSocketState } from '../../state/WebSocketState';

const Cursor: React.FC = () => {
  const [cursorData, setCursorData] = useState<CursorData>({ x: 0, y: 0, remoteUser: '' });
  const socket = useWebSocketState((state) => state.socket);

  useEffect(() => {
    if (socket) {
      socket?.on('cursor', (data: CursorData) => setCursorData(data));
    }
  }, [socket]);

  return (
    <>
      {socket && cursorData.remoteUser !== socket.id && (
        <div
          style={{ left: Math.floor(cursorData.x), top: Math.floor(cursorData.y) }}
          className=' absolute z-50 top-0 left-0'
        >
          <FontAwesomeIcon className='w-4 h-4' icon={faArrowPointer} />
          {cursorData.remoteUser}
        </div>
      )}
    </>
  );
};

export default Cursor;
