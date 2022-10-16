import React, { useEffect } from 'react';
import Board from './components/Board/Board';
import { useToggle } from './hooks/useToggle';
import Sidebar from './components/Sidebar/Sidebar';
import { useContextMenu } from './hooks/useContextMenu';
import AddTileForm from './components/Forms/AddTileForm';
import RightClickMenu from './components/ContextMenus/RightClickMenu';
import Cursor from './components/Cursor/Cursor';
import { useWebSockets } from './hooks/useWebSockets';
import { useWebSocketState } from './state/WebSocketState';

const App = () => {
  const { isOpen, toggleForm } = useToggle();
  const { contextMenu } = useContextMenu();
  const { currentSocket, socketId } = useWebSockets();
  const setSocket = useWebSocketState((state) => state.setSocket);
  const setSocketId = useWebSocketState((state) => state.setSocketId);
  const socket = useWebSocketState((state) => state.socket);

  useEffect(() => {
    if (currentSocket && socketId) {
      setSocket(currentSocket);
      setSocketId(socketId);
    }
  }, []);

  return (
    <>
      {socket && <Cursor />}
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

export default App;
