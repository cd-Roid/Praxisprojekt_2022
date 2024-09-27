import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type ContextMenuStateType = {
  panelOpen: boolean;
  contextMenuOpen: boolean;
  lineContextMenuOpen: boolean;
  setPanelOpen: (value: boolean) => void;
  setContextMenuOpen: (value: boolean) => void;
  setLineContextMenuOpen: (value: boolean) => void;
  contextMenuAnchorPoint: { x: number; y: number; id: string };
  setContextMenuAnchorPoint: (value: { x: number; y: number; id: string }) => void;
};

export const useContextMenuState = create<ContextMenuStateType>((set) => ({
  panelOpen: false,
  contextMenuOpen: false,
  lineContextMenuOpen: false,
  contextMenuAnchorPoint: { x: 0, y: 0, id: '' },
  setPanelOpen: (value: boolean) => set(() => ({ panelOpen: value })),
  setContextMenuAnchorPoint: (value: { x: number; y: number; id: string }) =>
    set(() => ({ contextMenuAnchorPoint: value })),
  setContextMenuOpen: (value: boolean) => set(() => ({ contextMenuOpen: value })),
  setLineContextMenuOpen: (value: boolean) => set(() => ({ lineContextMenuOpen: value })),
}));


if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('ContextMenuState', useContextMenuState);
}
