/* eslint-disable @typescript-eslint/no-empty-function */
import create from 'zustand';
import { NewNode } from '../types';
import { createRef } from 'react';
import { Stage } from 'konva/lib/Stage';

export type BoardContextType = {
  tilesOnBoard: NewNode[];
  stageReference: React.RefObject<Stage>;
  addTile: (newNode: NewNode) => void;
  updateTile: (updatedNode: NewNode) => void;
  removeTile: (nodeToRemove: NewNode) => void;
  setStageReference: (stage: React.RefObject<Stage>) => void;
};

export const useBoardState = create<BoardContextType>((set) => ({
  tilesOnBoard: [],
  stageReference: createRef<Stage>(),
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
