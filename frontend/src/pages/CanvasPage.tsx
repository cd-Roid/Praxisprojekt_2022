import React from 'react';
import Board from '../components/Board/Board';
import Sidebar from '../components/Sidebar/Sidebar';
import { useWindowFocus } from '../hooks/useWindowFocus';
import InfoComponent from '../components/Forms/InfoComponent';
import SelectLampForm from '../components/Forms/SelectLampForm';
import { useContextMenuState } from '../state/ContextMenuState';
import TileRightClickMenu from '../components/ContextMenus/TileRightClickMenu';
import LineRightClickMenu from '../components/ContextMenus/LineRightClickMenu';

const CanvasPage = () => {
  // Add Cursor here. const socket = useWebSocketState((state) => state.socket);
  const { contextMenuOpen, lineContextMenuOpen } = useContextMenuState((state) => state);
  useWindowFocus();

  return (
    <>
      {contextMenuOpen === true && <TileRightClickMenu />}
      {lineContextMenuOpen === true && <LineRightClickMenu />}
      <InfoComponent />
      <Board />
      <Sidebar />
      <SelectLampForm />
    </>
  );
};

export default CanvasPage;
