import React from 'react';
import Board from './components/Board/Board';
import Sidebar from './components/Sidebar/Sidebar';
import NewTileButton from './components/Buttons/NewTileButton';

const App = () => {
  return (
    <>
      <NewTileButton />
      <Board />
      <Sidebar />
    </>
  );
};

export default App;
