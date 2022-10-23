import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useWebSockets = () => {
  const port = process.env.REACT_APP_WS_PORT;
  const socketRef = useRef<Socket | null>(null);
  const socket = io(`http://localhost:${port}`, {
    transports: ['websocket'],
  });

  useEffect(() => {
    socketRef.current = socket;
    socket.on('disconnect', () => {
      console.log('SocketIO: Disconnected');
    });

    socket.on('error', (msg: string) => {
      console.error('Client Error:', msg);
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socket.close();
    };
  }, []);

  return { socketRef };
};
