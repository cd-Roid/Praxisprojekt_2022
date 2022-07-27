import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketProvider = () => {
  const [currentSocket, setCurrentSocket] = useState<Socket | null>(null);
  const [socketString, setSocketString] = useState<string>();

  useEffect(() => {
    const socket = io('http://localhost:9001', { transports: ['websocket'] });
    socket.on('connect', () => setSocketString(`new Connection from ${socket.id}`));
    socket.connect();
    setCurrentSocket(socket);
  }, []);

  return { currentSocket, socketString };
};
