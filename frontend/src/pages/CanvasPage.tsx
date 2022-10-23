import React, { useEffect } from 'react';
import Board from '../components/Board/Board';
import { useToggle } from '../hooks/useToggle';
import Sidebar from '../components/Sidebar/Sidebar';
import AddTileForm from '../components/Forms/AddTileForm';
import Cursor from '../components/Cursor/Cursor';
import { useWebSockets } from '../hooks/useWebSockets';
import { useWebSocketState } from '../state/WebSocketState';

const CanvasPage = () => {
  const { isOpen, toggleForm } = useToggle();
  const { socketRef } = useWebSockets();

  const setSocket = useWebSocketState((state) => state.setSocket);

  useEffect(() => {
    socketRef.current && setSocket(socketRef.current);
  }, []);

  return (
    <>
      {socketRef && <Cursor />}
      {isOpen && (
        <div className=' absolute bg-stone-600 w-full h-full'>
          <AddTileForm closeForm={() => toggleForm()} />
        </div>
      )}
      <Board />
      <Sidebar />
    </>
  );
};

export default CanvasPage;
