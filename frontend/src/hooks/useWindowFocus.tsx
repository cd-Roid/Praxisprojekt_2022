import { useEffect, useState } from 'react';
import { useWebSocketState } from '../state/WebSocketState';

export const useWindowFocus = () => {
  const [tabHasFocus, setTabHasFocus] = useState(true);
  const socket = useWebSocketState((state) => state.socket);

  useEffect(() => {
    const handleFocus = () => {
      console.log('Tab has focus');
      socket?.emit('tab-focus', true);
      setTabHasFocus(true);
    };

    const handleBlur = () => {
      console.log('Tab lost focus');
      socket?.emit('tab-focus', false);
      setTabHasFocus(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);
  return tabHasFocus;
};
