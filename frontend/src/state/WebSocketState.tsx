import create from 'zustand';
import { Socket } from 'socket.io-client';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type WebSocketContextType = {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  socketId: string | null;
  setSocketId: (socketId: string) => void;
  room: string | null;
  setRoom: (room: string) => void;
};

export const useWebSocketState = create<WebSocketContextType>((set) => ({
  socket: null,
  socketId: null,
  room: null,
  setSocket: (socket: Socket) => set(() => ({ socket: socket })),
  setSocketId: (socketId: string) => set(() => ({ socketId: socketId })),
  setRoom: (room: string) => set(() => ({ room })),
}));

mountStoreDevtool('WebSocketState', useWebSocketState);
