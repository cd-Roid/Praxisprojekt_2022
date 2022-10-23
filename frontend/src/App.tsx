import { useEffect } from 'react';
import { useWebSockets } from './hooks/useWebSockets';
import CanvasPage from './pages/CanvasPage';
import LandingPage from './pages/LandingPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useWebSocketState } from './state/WebSocketState';
import NoMatch from './pages/NoMatch';

const App = () => {
  // TODO: move the setting of the websocket to the LandingPage
  const { socketRef } = useWebSockets();
  const setSocket = useWebSocketState((state) => state.setSocket);

  useEffect(() => {
    socketRef.current && setSocket(socketRef.current);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/canvas' element={<CanvasPage />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
