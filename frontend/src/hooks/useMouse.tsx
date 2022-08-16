import { KonvaEventObject } from 'konva/lib/Node';
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
        y: coordinates?.y - 100,
      };
      setTilesOnBoard(tilesOnBoard.concat(newTile));
    }
  }
};

export const handleWheel = (
  event: KonvaEventObject<WheelEvent>,
  stageRef: React.RefObject<Stage>,
) => {
  event.evt.preventDefault();
  if (stageRef.current !== null) {
    const scaleBy = 1.05;
    const oldScale = stageRef.current.scaleX();
    const pointer = stageRef.current.getPointerPosition();
    if (pointer !== null) {
      const mousePointTo = {
        x: (pointer.x - stageRef.current.x()) / oldScale,
        y: (pointer.y - stageRef.current.y()) / oldScale,
      };
      let direction = event.evt.deltaY > 0 ? 1 : -1;
      if (mousePointTo) {
        direction = -direction;
      }
      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stageRef.current.scale({ x: newScale, y: newScale });

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      stageRef.current.position(newPos);
    }
  }
};
