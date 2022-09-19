import React from 'react';
import { NewNode } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { KonvaEventObject } from 'konva/lib/Node';
import { useBoardState } from '../state/BoardState';

export const useMouse = () => {
  const setTiles = useBoardState((state) => state.addTile);
  const updateTile = useBoardState((state) => state.updateTile);
  const stageRef = useBoardState((state) => state.stageReference);

  const handleDragOver = (event: React.DragEvent) => event.preventDefault();

  const handleDragStart = (event: React.DragEvent) => {
    const dragPayload = JSON.stringify({
      name: event.currentTarget.getAttribute('data-name'),
      nodeClass: event.currentTarget.getAttribute('data-class'),
    });
    event.dataTransfer.setData('dragStart/Tile', dragPayload);
  };

  const updateTilePosition = (event: KonvaEventObject<DragEvent>) => {
    const { text } = event.target.getAttr('children')[1].attrs;
    if (stageRef.current) {
      const { x, y } = stageRef.current.getRelativePointerPosition();
      const updatedTile: NewNode = {
        id: event.target.attrs.id,
        name: text,
        category: event.target.attrs.name,
        x: x,
        y: y,
      };
      updateTile(updatedTile);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const draggedData = event.dataTransfer.getData('dragStart/Tile');
    if (draggedData && stageRef.current != null) {
      stageRef.current.setPointersPositions(event);
      const coordinates = stageRef.current.getRelativePointerPosition();
      const { name, nodeClass } = JSON.parse(draggedData);
      if (coordinates != undefined) {
        const newTile: NewNode = {
          id: uuidv4(),
          name: name,
          category: nodeClass,
          x: coordinates?.x,
          y: coordinates?.y,
        };
        setTiles(newTile);
      }
    }
  };

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
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
  return { handleDragOver, handleDragStart, handleDrop, handleWheel, updateTilePosition };
};
