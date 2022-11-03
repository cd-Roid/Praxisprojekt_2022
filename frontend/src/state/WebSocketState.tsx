import create from 'zustand';
import { Socket } from 'socket.io-client';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type RoomData = { roomId: string; hostName: string; hostId: string };

export type WebSocketContextType = {
  socket: Socket | null;
  room: RoomData | null;
  users: { userId: string; userName: string }[];
  setSocket: (socket: Socket) => void;
  setRoom: (room: RoomData) => void;
  clearRoom: () => void;
  addUser: (user: { userId: string; userName: string }) => void;
  removeUser: (userId: string) => void;
  clearUsers: () => void;
};

export const useWebSocketState = create<WebSocketContextType>((set) => ({
  socket: null,
  room: null,
  users: [],
  setSocket: (socket: Socket) => set(() => ({ socket: socket })),
  setRoom: (roomData: RoomData) => set(() => ({ room: roomData })),
  clearRoom: () => set(() => ({ room: null })),
  addUser: (user: { userId: string; userName: string }) =>
    set((state) => ({ users: [...state.users, user] })),
  removeUser: (userId: string) =>
    set((state) => ({ users: state.users.filter((user) => user.userId !== userId) })),
  clearUsers: () => set(() => ({ users: [] })),
}));

mountStoreDevtool('WebSocketState', useWebSocketState);
