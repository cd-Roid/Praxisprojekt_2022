import React from 'react';
import Board from './components/Board/Board';
import AddTileForm from './components/Forms/AddTileForm';
import Sidebar from './components/Sidebar/Sidebar';
import { useToggle } from './hooks/useToggle';

const App = () => {
  const { isOpen, toggleForm } = useToggle();

  return (
    <>
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

