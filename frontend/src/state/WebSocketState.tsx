import create from 'zustand';
import { Socket } from 'socket.io-client';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { RoomData } from '../types';

// TODO: split up room and user data
export type WebSocketContextType = {
  socket: Socket | null;
  room: RoomData | null;
  setSocket: (socket: Socket) => void;
  setRoom: (room: RoomData) => void;
  clearRoom: () => void;
};

export const useWebSocketState = create<WebSocketContextType>((set) => ({
  socket: null,
  room: null,
  setSocket: (socket: Socket) => set(() => ({ socket: socket })),
  setRoom: (roomData: RoomData) => set(() => ({ room: roomData })),
  clearRoom: () => set(() => ({ room: null })),
}));

mountStoreDevtool('WebSocketState', useWebSocketState);
