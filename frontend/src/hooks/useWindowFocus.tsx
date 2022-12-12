import { useEffect, useState } from 'react';
import { useWebSocketState } from '../state/WebSocketState';

export const useWindowFocus = () => {
  const [tabHasFocus, setTabHasFocus] = useState(true);
  const socket = useWebSocketState((state) => state.socket);
  const roomId = useWebSocketState((state) => state.room?.roomId);

  useEffect(() => {
    const handleFocus = () => {
      setTabHasFocus(true);
      socket?.emit('tab-focus', { hasFocus: true, roomId, userId: socket.id });
    };

    const handleBlur = () => {
      setTabHasFocus(false);
      socket?.emit('tab-focus', { hasFocus: false, roomId, userId: socket.id });
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return { tabHasFocus };
};
