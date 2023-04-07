// state that saves Connected Tiles Globally
// also saves the connections between them

import create from 'zustand';
import { ASTType } from '../astTypes';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { findConnections } from '../utils/tileConnections';

export type ConnectedTilesContextType = {
  fromShapeId: string | null;
  ast: ASTType | null;
  generatedCode: {
    js: string;
    py: string;
  };
  connectionPreview: JSX.Element | null;
  connections: { from: string; to: string }[];
  setAst: (value: ASTType | null) => void;
  setGeneratedCode: (value: { js: string; py: string }) => void;
  setFromShapeId: (value: string | null) => void;
  setConnectionPreview: (value: JSX.Element | null) => void;
  removeConnection: (value: string) => void;
  setConnections: (value: { from: string; to: string }[]) => void;
};

export const useConnectedTilesState = create<ConnectedTilesContextType>((set) => ({
  ast: null,
  generatedCode: { js: '', py: '' },
  connections: [],
  fromShapeId: null,
  connectedTiles: {},
  connectionPreview: null,
  setGeneratedCode: (value: { js: string; py: string }) => set(() => ({ generatedCode: value })),
  setAst: (value: ASTType | null) => set(() => ({ ast: value })),
  setFromShapeId: (value: string | null) => set(() => ({ fromShapeId: value })),
  removeConnection: (value: string) =>
    set((state) => ({
      connections: findConnections(value, state.connections),
    })),
  setConnections: (value: { from: string; to: string }[]) => set(() => ({ connections: value })),
  setConnectionPreview: (value: JSX.Element | null) => set(() => ({ connectionPreview: value })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('ConnectedTilesContext', useConnectedTilesState);
}
