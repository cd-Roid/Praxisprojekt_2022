import { CursorData } from '../../types';
import React, { useState, useEffect } from 'react';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWebSocketState } from '../../state/WebSocketState';

const Cursor: React.FC = () => {
  const [cursorData, setCursorData] = useState<CursorData>({ x: 0, y: 0 });
  const socket = useWebSocketState((state) => state.socket);
  const socketId = useWebSocketState((state) => state.socketId);

  useEffect(() => {
    if (socket !== null) {
      console.log(socket);
      socket?.on('cursor', (data: CursorData) => setCursorData(data));
    }
  }, [socket]);

  return (
    <>
      {socket && socket.id != socketId && (
        <div
          style={{ left: Math.floor(cursorData.x), top: Math.floor(cursorData.y) }}
          className=' absolute z-50 top-0 left-0'
        >
          <FontAwesomeIcon className='w-6 h-6' icon={faArrowPointer} />
          {socket.id}
        </div>
      )}
    </>
  );
};

export default Cursor;
