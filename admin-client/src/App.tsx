import React from 'react';
import OverviewPage from './pages/OverviewPage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import NewTilePage from './pages/NewTilePage';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<OverviewPage />} />
          <Route path='/:id' element={<DetailPage />} />
          <Route path='/newTile' element={<NewTilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
