import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export const useWebSockets = () => {
  const [currentSocket, setCurrentSocket] = useState<Socket | null>(null);
  const [socketId, setSocketId] = useState<string>();

  useEffect(() => {
    const socket = io('http://localhost:9001', { transports: ['websocket'] });
    socket.connect();
    socket.on('connect', () => setSocketId('socket.id'));
    setCurrentSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return { currentSocket, socketId };
};
