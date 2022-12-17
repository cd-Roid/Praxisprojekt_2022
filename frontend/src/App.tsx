import CanvasPage from './pages/CanvasPage';
import LandingPage from './pages/LandingPage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import NoMatch from './pages/NoMatch';
import { useWebSocketState } from './state/WebSocketState';
import { useWebSockets } from './hooks/useWebSockets';
import { useEffect } from 'react';

const App = () => {
  const { socketRef } = useWebSockets();
  const setSocket = useWebSocketState((state) => state.setSocket);

  useEffect(() => {
    socketRef.current && setSocket(socketRef.current);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/room/:roomId' element={<CanvasPage />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

export default App;
