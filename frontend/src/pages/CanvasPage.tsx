import React, { useEffect, useState } from 'react';
import Board from '../components/Board/Board';
import { useToggle } from '../hooks/useToggle';
import Sidebar from '../components/Sidebar/Sidebar';
import { useContextMenu } from '../hooks/useContextMenu';
import AddTileForm from '../components/Forms/AddTileForm';
import RightClickMenu from '../components/ContextMenus/RightClickMenu';
import Cursor from '../components/Cursor/Cursor';
import { useWebSockets } from '../hooks/useWebSockets';
import { useWebSocketState } from '../state/WebSocketState';

const CanvasPage = () => {
  const { isOpen, toggleForm } = useToggle();
  const { contextMenu } = useContextMenu();
  const { socketRef } = useWebSockets();
  const setSocket = useWebSocketState((state) => state.setSocket);

  useEffect(() => {
    if (socketRef.current) {
      setSocket(socketRef.current);
    }
  }, []);
  return (
    <>
      {socketRef && <Cursor />}
      {contextMenu && <RightClickMenu />}
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
