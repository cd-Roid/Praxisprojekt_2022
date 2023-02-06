import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type ContextMenuStateType = {
  contextMenuOpen: boolean;
  contextMenuAnchorPoint: { x: number; y: number; id: string };
  panelOpen: boolean;
  setPanelOpen: (value: boolean) => void;
  setContextMenuOpen: (value: boolean) => void;
  setContextMenuAnchorPoint: (value: { x: number; y: number; id: string }) => void;
};

export const useContextMenuState = create<ContextMenuStateType>((set) => ({
  contextMenuOpen: false,
  contextMenuAnchorPoint: { x: 0, y: 0, id: '' },
  panelOpen: false,
  setPanelOpen: (value: boolean) => set(() => ({ panelOpen: value })),
  setContextMenuOpen: (value: boolean) => set(() => ({ contextMenuOpen: value })),
  setContextMenuAnchorPoint: (value: { x: number; y: number; id: string }) =>
    set(() => ({ contextMenuAnchorPoint: value })),
}));


if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('ContextMenuState', useContextMenuState);
}
