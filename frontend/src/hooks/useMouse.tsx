import React, { useContext } from 'react';
import { NewNode } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { KonvaEventObject } from 'konva/lib/Node';
import { BoardContext } from '../contexts/BoardContext';

export const useMouse = () => {
  const T = useContext(BoardContext).tilesOnBoard;
  const setTiles = useContext(BoardContext).updateBoard;
  const stageRef = useContext(BoardContext).stageReference;

  const handleDragOver = (event: React.DragEvent) => event.preventDefault();

  const handleDragStart = (event: React.DragEvent) => {
    const dragPayload = JSON.stringify({
      name: event.currentTarget.getAttribute('data-name'),
      nodeClass: event.currentTarget.getAttribute('data-class'),
    });
    event.dataTransfer.setData('dragStart/Tile', dragPayload);
  };

  const updateTilePosition = (event: KonvaEventObject<DragEvent>) => {
    console.log(event.currentTarget);
    if (stageRef.current) {
      const coordinates = stageRef.current.getRelativePointerPosition();
      // update the tile position
      if (coordinates) {
        const newTiles = T.map((tile) => {
          if (tile.id === event.target.id()) {
            return {
              ...tile,
              x: coordinates.x,
              y: coordinates.y,
            };
          }
          return tile;
        });
        console.log(newTiles);
        setTiles(newTiles);
      }
    }
  };

  const handleDrop = (
    event: React.DragEvent,
    tilesOnBoard: NewNode[],
    setTilesOnBoard: React.Dispatch<React.SetStateAction<NewNode[]>>,
  ) => {
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
        setTilesOnBoard([...tilesOnBoard, newTile]);
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
