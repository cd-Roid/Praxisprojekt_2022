import React from 'react';
import Board from './components/Board/Board';
import NewTileButton from './components/Buttons/NewTileButton';
import Sidebar from './components/Sidebar/Sidebar';

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
