import React from 'react';
import { NewNode, SocketDragTile } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Group } from 'konva/lib/Group';
import { KonvaEventObject } from 'konva/lib/Node';
import { useBoardState } from '../state/BoardState';
import { useWebSocketState } from '../state/WebSocketState';

export const useMouse = () => {
  const setTiles = useBoardState((state) => state.addTile);
  const updateTile = useBoardState((state) => state.updateTile);
  const stageRef = useBoardState((state) => state.stageReference);
  const setActiveDragTile = useBoardState((state) => state.setActiveDragTile);
  const socket = useWebSocketState((state) => state.socket);
  const categoriesOpen = useBoardState((state) => state.categoriesOpen);
  const setCategoriesOpen = useBoardState((state) => state.setCategoriesOpen);

  const toggleCategory = () => {
    if (categoriesOpen) {
      setCategoriesOpen(false);
    }
  };

  const handleMouseMove = () => {
    if (stageRef.current) {
      const stage = stageRef.current;
      const pos = stage.getPointerPosition();
      if (pos && socket) {
        const { x, y } = pos;
        const cursorPos = {
          x: x,
          y: y,
          remoteUser: socket.id,
        };
        if (socket !== null) {
          socket?.emit('cursor', cursorPos);
        }
      }
    }
  };

  const setActiveDragElement = (
    activeTileReference: React.RefObject<Group>,
    event: KonvaEventObject<DragEvent>,
  ) => {
    setActiveDragTile(activeTileReference);

    if (stageRef.current) {
      const { 'data-src': url } = event.target.attrs;

      const updatedTile: NewNode = {
        id: event.target.attrs.id,
        category: event.target.attrs.name,
        x: event.target.x(),
        y: event.target.y(),
        src: url,
      };
      if (socket !== null) {
        const socketDragTile: SocketDragTile = {
          remoteUser: socket.id,
          tile: updatedTile,
        };
        socket?.emit('tile-drag', socketDragTile);
        socket?.emit('cursor', { x: event.evt.x, y: event.evt.y, remoteUser: socket.id });
      }
    }
  };

  const handleMouseEnL = (event: KonvaEventObject<MouseEvent>, strokeWidth: number) => {
    // for mouse Enter and Leave
    // function to set the stroke width when user hovers over a Tile
    event.target.setAttr('strokeWidth', strokeWidth);
  };

  const handleDragOver = (event: React.DragEvent) => event.preventDefault();

  const handleDragStart = (event: React.DragEvent) => {
    // use HTML DnD API to send Tile Information
    const dragPayload = JSON.stringify({
      nodeClass: event.currentTarget.getAttribute('data-class'),
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
      clientWidth: event.currentTarget.clientWidth,
      clientHeight: event.currentTarget.clientHeight,
      url: event.currentTarget.getAttribute('src'),
    });
    event.dataTransfer.setData('dragStart/Tile', dragPayload);
  };

  const updateTilePosition = (event: KonvaEventObject<DragEvent>) => {
    /**
     * updates the Tile position in the state
     * also clears the active Drag Element
     */
    const { 'data-src': url } = event.target.attrs;
    if (stageRef.current) {
      const updatedTile: NewNode = {
        id: event.target.attrs.id,
        category: event.target.attrs.name,
        x: event.target.x(),
        y: event.target.y(),
        src: url,
      };
      updateTile(updatedTile);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    // add Tile to stage
    event.preventDefault();

    const draggedData = event.dataTransfer.getData('dragStart/Tile');
    if (draggedData && stageRef.current != null) {
      stageRef.current.setPointersPositions(event);
      const { x, y } = stageRef.current.getRelativePointerPosition();
      const { url, nodeClass, offsetX, offsetY, clientHeight, clientWidth } =
        JSON.parse(draggedData);
      if (x && y) {
        const newTile: NewNode = {
          id: uuidv4(),
          src: url,
          category: nodeClass,
          x: x - (offsetX - clientWidth / 2),
          y: y - (offsetY - clientHeight / 2),
        };
        setTiles(newTile);
        if (socket !== null) {
          const socketDragTile: SocketDragTile = {
            remoteUser: socket.id,
            tile: newTile,
          };
          socket?.emit('tile-drop', socketDragTile);
        }
      }
    }
  };

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
    // scale a stage up or down
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

  return {
    handleMouseMove,
    handleDragOver,
    handleDragStart,
    handleDrop,
    handleWheel,
    toggleCategory,
    handleMouseEnL,
    updateTilePosition,
    setActiveDragElement,
  };
};
