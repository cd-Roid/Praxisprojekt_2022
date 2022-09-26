/* eslint-disable @typescript-eslint/no-empty-function */
import create from 'zustand';
import React, { createRef } from 'react';
import { NewNode, InnerObject } from '../types';
import { Stage } from 'konva/lib/Stage';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type BoardContextType = {
  modalOpen: boolean;
  allTiles: InnerObject[];
  tilesOnBoard: NewNode[];
  activeDragTile: NewNode | null;
  stageReference: React.RefObject<Stage>;
  clearActiveDragTile: () => void;
  addTile: (newNode: NewNode) => void;
  toggleModal: (toggle: boolean) => void;
  updateTile: (updatedNode: NewNode) => void;
  removeTile: (nodeToRemove: NewNode) => void;
  setAllTiles: (tilesArray: InnerObject[]) => void;
  setActiveDragTile: (newActiveTile: NewNode) => void;
  setStageReference: (stage: React.RefObject<Stage>) => void;
};

export const useBoardState = create<BoardContextType>((set) => ({
  allTiles: [],
  modalOpen: false,
  tilesOnBoard: [],
  activeDragTile: null,
  stageReference: createRef<Stage>(),
  clearActiveDragTile: () => set(() => ({ activeDragTile: null })),
  setActiveDragTile: (newActiveTile: NewNode) => set(() => ({ activeDragTile: newActiveTile })),
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
  removeTile: (tileToRemove: NewNode) =>
    set((state) => ({
      tilesOnBoard: state.tilesOnBoard.filter((tile) => tile.id !== tileToRemove.id),
    })),
  setStageReference: (stageRef: React.RefObject<Stage>) =>
    set(() => ({ stageReference: stageRef })),
}));

// :TODO: Remove this before production
mountStoreDevtool('BoardStore', useBoardState);
