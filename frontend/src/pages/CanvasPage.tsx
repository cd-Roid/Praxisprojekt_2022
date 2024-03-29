import React from 'react';
import Board from '../components/Board/Board';
import { useToggle } from '../hooks/useToggle';
import Sidebar from '../components/Sidebar/Sidebar';
import AddTileForm from '../components/Forms/AddTileForm';
import Cursor from '../components/Cursor/Cursor';
import { useWebSocketState } from '../state/WebSocketState';
import RightClickMenu from '../components/ContextMenus/RightClickMenu';
import { useContextMenuState } from '../state/ContextMenuState';
import InfoComponent from '../components/Forms/InfoComponent';
import { useWindowFocus } from '../hooks/useWindowFocus';

const CanvasPage = () => {
  const { isOpen, toggleForm } = useToggle();
  // Add Cursor here. const socket = useWebSocketState((state) => state.socket);
  const contextMenuOpen = useContextMenuState((state) => state.contextMenuOpen);
  const room = useWebSocketState((state) => state.room);
  useWindowFocus();

  return (
    <>
      {contextMenuOpen === true && <RightClickMenu />}
      {isOpen && (
        <div className=' absolute bg-stone-600 w-full h-full'>
          <AddTileForm closeForm={() => toggleForm()} />
        </div>
      )}
      <InfoComponent />
      <Board />
      <Sidebar />
    </>
  );
};

export default CanvasPage;
