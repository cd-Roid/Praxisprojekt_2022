import { useEffect } from 'react';
import NoMatch from './pages/NoMatch';
import CanvasPage from './pages/CanvasPage';
import LandingPage from './pages/LandingPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useWebSocketState } from './state/WebSocketState';
import { useWebSockets } from './hooks/useWebSockets';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const { socketRef } = useWebSockets();
  const setSocket = useWebSocketState((state) => state.setSocket);

  useEffect(() => {
    socketRef.current && setSocket(socketRef.current);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/room/:roomId' element={<CanvasPage />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
