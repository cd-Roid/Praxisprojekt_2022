import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type ContextMenuStateType = {
  contextMenuOpen: boolean;

  contextMenuAnchorPoint: { x: number; y: number; id: string };
  setContextMenuOpen: (value: boolean) => void;
  setContextMenuAnchorPoint: (value: { x: number; y: number; id: string }) => void;
};

export const useContextMenuState = create<ContextMenuStateType>((set) => ({
  contextMenuOpen: false,
  contextMenuAnchorPoint: { x: 0, y: 0, id: '' },
  setContextMenuOpen: (value: boolean) => set(() => ({ contextMenuOpen: value })),
  setContextMenuAnchorPoint: (value: { x: number; y: number; id: string }) =>
    set({ contextMenuAnchorPoint: value }),
}));

mountStoreDevtool('ContextMenuState', useContextMenuState);
