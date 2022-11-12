import CanvasPage from './pages/CanvasPage';
import LandingPage from './pages/LandingPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NoMatch from './pages/NoMatch';
import { useWebSocketState } from './state/WebSocketState';
import { useWebSockets } from './hooks/useWebSockets';
import { useEffect } from 'react';

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
        <Route path='Praxisprojekt_2022/' element={<LandingPage />} />
        <Route path='/Praxisprojekt_2022/room/:roomId' element={<CanvasPage />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
