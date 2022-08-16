import { Stage } from 'konva/lib/Stage';
import React from 'react';
import { NewNode } from '../types';

export const handleDragOver = (event: React.DragEvent) => event.preventDefault();

export const handleDrop = (
  event: React.DragEvent,
  tilesOnBoard: NewNode[],
  stageReference: React.RefObject<Stage>,
  setTilesOnBoard: React.Dispatch<React.SetStateAction<NewNode[]>>,
) => {
  const draggedData = event.dataTransfer.getData('dragStart/Tile');
  if (draggedData && stageReference.current != null) {
    stageReference.current.setPointersPositions(event);
    const coordinates = stageReference.current.getPointerPosition();
    const { name, nodeClass } = JSON.parse(draggedData);
    if (coordinates != undefined) {
      const newTile: NewNode = {
        name: name,
        category: nodeClass,
        x: coordinates?.x,
        y: coordinates?.y,
      };
      setTilesOnBoard(tilesOnBoard.concat(newTile));
    }
  }
};
