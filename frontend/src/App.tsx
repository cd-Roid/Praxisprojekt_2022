import { useEffect } from 'react';
import { useWebSockets } from './hooks/useWebSockets';
import CanvasPage from './pages/CanvasPage';
import LandingPage from './pages/LandingPage';
import { useWebSocketState } from './state/WebSocketState';

const App = () => {
  // TODO: move the setting of the websocket to the LandingPage
  const { socketRef } = useWebSockets();
  const setSocket = useWebSocketState((state) => state.setSocket);

  useEffect(() => {
    socketRef.current && setSocket(socketRef.current);
  }, []);

  return <CanvasPage />;
};

export default App;
