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
  selectedTile: Tile | null;
  remoteDragColor: string | null;
  stageReference: React.RefObject<Stage>;
  activeDragTile: React.RefObject<Group> | null;
  clearActiveDragTile: () => void;
  addTile: (newTile: Tile) => void;
  setSelectedTile: (tile: Tile | null) => void;
  toggleModal: (toggle: boolean) => void;
  updateTile: (updatedNode: Tile) => void;
  setAllTiles: (tilesArray: Tile[]) => void;
  removeTile: (nodeToRemove: string) => void;
  setCategoriesOpen: (toggle: boolean) => void;
  setRemoteDragColor: (color: string | null) => void;
  setStageReference: (stage: React.RefObject<Stage>) => void;
  setActiveDragTile: (newActiveTile: React.RefObject<Group>) => void;
};

export const useBoardState = create<BoardContextType>((set) => ({
  allTiles: [],
  modalOpen: false,
  categoriesOpen: false,
  tilesOnBoard: [],
  selectedTile: null,
  activeDragTile: null,
  remoteDragColor: '',
  stageReference: createRef<Stage>(),

  clearActiveDragTile: () => set(() => ({ activeDragTile: null })),
  setSelectedTile: (tile: Tile | null) => set(() => ({ selectedTile: tile })),
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
