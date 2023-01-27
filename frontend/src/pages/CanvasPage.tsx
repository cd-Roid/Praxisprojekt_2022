import React from 'react';
import Board from '../components/Board/Board';
import Sidebar from '../components/Sidebar/Sidebar';
import RightClickMenu from '../components/ContextMenus/RightClickMenu';
import { useContextMenuState } from '../state/ContextMenuState';
import InfoComponent from '../components/Forms/InfoComponent';
import { useWindowFocus } from '../hooks/useWindowFocus';
import SelectLampForm from '../components/Forms/SelectLampForm';

const CanvasPage = () => {
  // Add Cursor here. const socket = useWebSocketState((state) => state.socket);
  const contextMenuOpen = useContextMenuState((state) => state.contextMenuOpen);
  useWindowFocus();

  return (
    <>
      {contextMenuOpen === true && <RightClickMenu />}
      <InfoComponent />
      <Board />
      <Sidebar />
      <SelectLampForm />
    </>
  );
};

export default CanvasPage;
