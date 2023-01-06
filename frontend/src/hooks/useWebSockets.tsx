import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useWebSockets = () => {
  let connectionString = '';
  if (process.env.REACT_APP_PROD_BACKEND_URL && process.env.NODE_ENV === 'production') {
    connectionString = process.env.REACT_APP_PROD_BACKEND_URL;
  } else if (process.env.REACT_APP_BACKEND_URL && process.env.NODE_ENV !== 'production') {
    connectionString = process.env.REACT_APP_BACKEND_URL;
  }

  const socketRef = useRef<Socket | null>(null);
  const socket = io(connectionString, {
    transports: ['polling', 'websocket'],
    port: process.env.REACT_APP_BACKEND_PORT,
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
