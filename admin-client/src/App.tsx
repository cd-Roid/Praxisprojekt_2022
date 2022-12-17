import React from 'react';
import DetailPage from './pages/DetailPage';
import NewTilePage from './pages/NewTilePage';
import 'react-toastify/dist/ReactToastify.css';
import OverviewPage from './pages/OverviewPage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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
      <ToastContainer />
    </>
  );
}

export default App;
