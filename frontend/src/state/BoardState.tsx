/* eslint-disable @typescript-eslint/no-empty-function */
import create from 'zustand';
import { Stage } from 'konva/lib/Stage';
import { Group } from 'konva/lib/Group';
import React, { createRef } from 'react';
import { Tile } from '../types';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type BoardContextType = {
  modalOpen: boolean;
  categoriesOpen: boolean;
  allTiles: Tile[];
  tilesOnBoard: Tile[];
  remoteDragColor: string | null;
  activeDragTile: React.RefObject<Group> | null;
  stageReference: React.RefObject<Stage>;
  clearActiveDragTile: () => void;
  addTile: (newTile: Tile) => void;
  toggleModal: (toggle: boolean) => void;
  updateTile: (updatedNode: Tile) => void;
  removeTile: (nodeToRemove: string) => void;
  setCategoriesOpen: (toggle: boolean) => void;
  setAllTiles: (tilesArray: Tile[]) => void;
  setRemoteDragColor: (color: string | null) => void;
  setActiveDragTile: (newActiveTile: React.RefObject<Group>) => void;
  setStageReference: (stage: React.RefObject<Stage>) => void;
};

export const useBoardState = create<BoardContextType>((set) => ({
  allTiles: [],
  modalOpen: false,
  categoriesOpen: false,
  tilesOnBoard: [],
  activeDragTile: null,
  remoteDragColor: '',
  stageReference: createRef<Stage>(),

  clearActiveDragTile: () => set(() => ({ activeDragTile: null })),
  setActiveDragTile: (newActiveTile: React.RefObject<Group>) =>
    set(() => ({ activeDragTile: newActiveTile })),
  setCategoriesOpen: (isOpen: boolean) => set(() => ({ categoriesOpen: isOpen })),
  toggleModal: (toggle: boolean) => set(() => ({ modalOpen: toggle })),
  setAllTiles: (tilesArray: Tile[]) => set(() => ({ allTiles: tilesArray })),
  addTile: (newTile: Tile) => set((state) => ({ tilesOnBoard: [...state.tilesOnBoard, newTile] })),
  updateTile: (updatedTile: Tile) =>
    set((state) => ({
      tilesOnBoard: state.tilesOnBoard.map((tile) =>
        tile.id === updatedTile.id ? updatedTile : tile,
      ),
    })),
  removeTile: (tileToRemove: string) =>
    set((state) => ({
      tilesOnBoard: state.tilesOnBoard.filter((tile) => tile.id !== tileToRemove),
    })),
  setRemoteDragColor: (color: string | null) => set(() => ({ remoteDragColor: color })),
  setStageReference: (stageRef: React.RefObject<Stage>) =>
    set(() => ({ stageReference: stageRef })),
}));

// :TODO: Remove this before production
mountStoreDevtool('BoardStore', useBoardState);
