/* eslint-disable @typescript-eslint/no-empty-function */
import create from 'zustand';
import { Stage } from 'konva/lib/Stage';
import { Group } from 'konva/lib/Group';
import React, { createRef } from 'react';
import { Tile } from '../types';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export type BoardContextType = {
  allTiles: Tile[];
  modalOpen: boolean;
  tilesOnBoard: Tile[];
  categoriesOpen: boolean;
  selectedTile: Tile | null;
  remoteDragColor: string | null;
  stageReference: React.RefObject<Stage>;
  activeDragTile: React.RefObject<Group> | null;
  clearActiveDragTile: () => void;
  addTile: (newTile: Tile) => void;
  toggleModal: (toggle: boolean) => void;
  updateTile: (updatedNode: Tile) => void;
  setAllTiles: (tilesArray: Tile[]) => void;
  removeTile: (nodeToRemove: string) => void;
  setCategoriesOpen: (toggle: boolean) => void;
  setSelectedTile: (tile: Tile | null) => void;
  setRemoteDragColor: (color: string | null) => void;
  setStageReference: (stage: React.RefObject<Stage>) => void;
  setActiveDragTile: (newActiveTile: React.RefObject<Group>) => void;
};

export const useBoardState = create<BoardContextType>((set) => ({
  allTiles: [],
  tilesOnBoard: [],
  modalOpen: false,
  selectedTile: null,
  remoteDragColor: '',
  activeDragTile: null,
  categoriesOpen: false,
  stageReference: createRef<Stage>(),

  updateTile: (updatedTile: Tile) =>
    set((state) => ({
      tilesOnBoard: state.tilesOnBoard.map((tile) =>
        tile.id === updatedTile.id ? updatedTile : tile,
      ),
    })),
  setStageReference: (stageRef: React.RefObject<Stage>) =>
    set(() => ({ stageReference: stageRef })),
  setActiveDragTile: (newActiveTile: React.RefObject<Group>) =>
    set(() => ({ activeDragTile: newActiveTile })),
  clearActiveDragTile: () => set(() => ({ activeDragTile: null })),
  toggleModal: (toggle: boolean) => set(() => ({ modalOpen: toggle })),
  setAllTiles: (tilesArray: Tile[]) => set(() => ({ allTiles: tilesArray })),
  setSelectedTile: (tile: Tile | null) => set(() => ({ selectedTile: tile })),
  setCategoriesOpen: (isOpen: boolean) => set(() => ({ categoriesOpen: isOpen })),
  removeTile: (tileToRemove: string) =>
    set((state) => ({
      tilesOnBoard: state.tilesOnBoard.filter((tile) => tile.id !== tileToRemove),
    })),
  setRemoteDragColor: (color: string | null) => set(() => ({ remoteDragColor: color })),
  addTile: (newTile: Tile) => set((state) => ({ tilesOnBoard: [...state.tilesOnBoard, newTile] })),
}));



if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('BoardStore', useBoardState);
}
