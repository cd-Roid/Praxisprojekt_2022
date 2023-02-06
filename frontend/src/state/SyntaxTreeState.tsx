// state that saves Connected Tiles Globally
// also saves the connections between them

import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type ConnectedTilesContextType = {
  connectedTiles: { [key: string]: string[] };
  connectionPreview: JSX.Element | null;
  setConnectionPreview: (value: JSX.Element | null) => void;
  setConnectedTiles: (value: { [key: string]: string[] }) => void;
};

export const useConnectedTilesContext = create<ConnectedTilesContextType>((set) => ({
  connectedTiles: {},
  connectionPreview: null,
  setConnectionPreview: (value: JSX.Element | null) => set(() => ({ connectionPreview: value })),
  setConnectedTiles: (value: { [key: string]: string[] }) => set(() => ({ connectedTiles: value })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('ConnectedTilesContext', useConnectedTilesContext);
}
