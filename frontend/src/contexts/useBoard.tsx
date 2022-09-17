import { NewNode } from '../types';

export const addTile = (tilesOnBoard: NewNode[], newTile: NewNode) => {
  return [...tilesOnBoard, newTile];
};

export const removeTile = (tilesOnBoard: NewNode[], tileToRemove: NewNode) => {
  return tilesOnBoard.filter((tile) => tile.id !== tileToRemove.id);
};

export const updateTile = (tilesOnBoard: NewNode[], updatedTile: NewNode) => {
  return tilesOnBoard.map((tile) => (tile.id === updatedTile.id ? updatedTile : tile));
};
