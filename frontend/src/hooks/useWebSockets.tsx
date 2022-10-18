import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useWebSockets = () => {
  const socketRef = useRef<Socket | null>(null);
  const socket = io('http://localhost:9001', { transports: ['websocket'] });

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
      socket.close();
    };
  }, []);
  return { socketRef };
};
