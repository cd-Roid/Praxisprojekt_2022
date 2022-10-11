/* eslint-disable @typescript-eslint/no-empty-function */
import create from 'zustand';
import { Stage } from 'konva/lib/Stage';
import { Group } from 'konva/lib/Group';
import React, { createRef } from 'react';
import { NewNode, InnerObject } from '../types';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type BoardContextType = {
  modalOpen: boolean;
  contextMenuOpen: boolean;
  contextMenuAnchorPoint: { x: number; y: number; id: string };
  allTiles: InnerObject[];
  tilesOnBoard: NewNode[];
  activeDragTile: React.RefObject<Group> | null;
  stageReference: React.RefObject<Stage>;
  setContextMenu: (value: boolean) => void;
  setContextMenuAnchorPoint: (value: { x: number; y: number; id: string }) => void;
  clearActiveDragTile: () => void;
  addTile: (newNode: NewNode) => void;
  toggleModal: (toggle: boolean) => void;
  updateTile: (updatedNode: NewNode) => void;
  removeTile: (nodeToRemove: string) => void;
  setAllTiles: (tilesArray: InnerObject[]) => void;
  setActiveDragTile: (newActiveTile: React.RefObject<Group>) => void;
  setStageReference: (stage: React.RefObject<Stage>) => void;
};

export const useBoardState = create<BoardContextType>((set) => ({
  allTiles: [],
  contextMenuOpen: false,
  contextMenuAnchorPoint: { x: 0, y: 0, id: '' },
  modalOpen: false,
  tilesOnBoard: [],
  activeDragTile: null,
  stageReference: createRef<Stage>(),
  setContextMenu: (value: boolean) => set({ contextMenuOpen: value }),
  setContextMenuAnchorPoint: (value: { x: number; y: number; id: string }) =>
    set({ contextMenuAnchorPoint: value }),
  clearActiveDragTile: () => set(() => ({ activeDragTile: null })),
  setActiveDragTile: (newActiveTile: React.RefObject<Group>) =>
    set(() => ({ activeDragTile: newActiveTile })),
  toggleModal: (toggle: boolean) => set(() => ({ modalOpen: toggle })),
  setAllTiles: (tilesArray: InnerObject[]) => set(() => ({ allTiles: tilesArray })),
  addTile: (newTile: NewNode) =>
    set((state) => ({ tilesOnBoard: [...state.tilesOnBoard, newTile] })),
  updateTile: (updatedTile: NewNode) =>
    set((state) => ({
      tilesOnBoard: state.tilesOnBoard.map((tile) =>
        tile.id === updatedTile.id ? updatedTile : tile,
      ),
    })),
  removeTile: (tileToRemove: string) =>
    set((state) => ({
      tilesOnBoard: state.tilesOnBoard.filter((tile) => tile.id !== tileToRemove),
    })),
  setStageReference: (stageRef: React.RefObject<Stage>) =>
    set(() => ({ stageReference: stageRef })),
}));

// :TODO: Remove this before production
mountStoreDevtool('BoardStore', useBoardState);
