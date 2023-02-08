import create from 'zustand';
import { Socket } from 'socket.io-client';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { RoomData } from '../types';

// TODO: split up room and user data
export type WebSocketContextType = {
  clearRoom: () => void;
  socket: Socket | null;
  room: RoomData | null;
  setRoom: (room: RoomData) => void;
  setSocket: (socket: Socket) => void;
};

export const useWebSocketState = create<WebSocketContextType>((set) => ({
  room: null,
  socket: null,
  clearRoom: () => set(() => ({ room: null })),
  setSocket: (socket: Socket) => set(() => ({ socket: socket })),
  setRoom: (roomData: RoomData) => set(() => ({ room: roomData })),
}));


if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('WebSocketState', useWebSocketState);
}

