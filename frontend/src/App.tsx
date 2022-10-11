import React from 'react';
import Board from './components/Board/Board';
import { useToggle } from './hooks/useToggle';
import Sidebar from './components/Sidebar/Sidebar';
import { useContextMenu } from './hooks/useContextMenu';
import AddTileForm from './components/Forms/AddTileForm';
import RightClickMenu from './components/ContextMenus/RightClickMenu';

const App = () => {
  const { isOpen, toggleForm } = useToggle();
  const { contextMenu } = useContextMenu();

  return (
    <>
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

