// state that saves Connected Tiles Globally
// also saves the connections between them

import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type ConnectedTilesContextType = {
  fromShapeId: string | null;
  connectionPreview: JSX.Element | null;
  connections: { from: string; to: string }[];
  setFromShapeId: (value: string | null) => void;
  setConnectionPreview: (value: JSX.Element | null) => void;
  setConnections: (value: { from: string; to: string }[]) => void;
};

export const useConnectedTilesState = create<ConnectedTilesContextType>((set) => ({
  connections: [],
  fromShapeId: null,
  connectedTiles: {},
  connectionPreview: null,
  setFromShapeId: (value: string | null) => set(() => ({ fromShapeId: value })),
  setConnections: (value: { from: string; to: string }[]) => set(() => ({ connections: value })),
  setConnectionPreview: (value: JSX.Element | null) => set(() => ({ connectionPreview: value })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('ConnectedTilesContext', useConnectedTilesState);
}
