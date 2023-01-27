import React from 'react';
import { SocketDragTile, Tile } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Group } from 'konva/lib/Group';
import { KonvaEventObject } from 'konva/lib/Node';
import { useBoardState } from '../state/BoardState';
import { useWebSocketState } from '../state/WebSocketState';
import { useContextMenuState } from '../state/ContextMenuState';

export const useMouse = () => {
  const setTiles = useBoardState((state) => state.addTile);
  const socket = useWebSocketState((state) => state.socket);
  const allTiles = useBoardState((state) => state.allTiles);
  const updateTile = useBoardState((state) => state.updateTile);
  const stageRef = useBoardState((state) => state.stageReference);
  const roomId = useWebSocketState((state) => state.room?.roomId);
  const contextMenuOpen = useContextMenuState((state) => state.contextMenuOpen);
  const setContextMenuOpen = useContextMenuState((state) => state.setContextMenuOpen);
  const setActiveDragTile = useBoardState((state) => state.setActiveDragTile);
  const setCategoriesOpen = useBoardState((state) => state.setCategoriesOpen);
  const userColor = useWebSocketState(
    (state) => state.room?.users.find((user) => user.userId === socket?.id)?.color,
  );

  const toggleCategory = () => {
    setCategoriesOpen(false);
  };

  const handleMouseMove = () => {
    if (stageRef.current) {
      const stage = stageRef.current;
      const pos = stage.getRelativePointerPosition();
      if (pos && socket) {
        const { x, y } = pos;
        const cursorPos = {
          x: x,
          y: y,
          remoteUser: socket.id,
          roomId: roomId,
        };
        if (socket !== null) {
          socket?.emit('cursor', cursorPos);
        }
      }
    }
  };

  const handleMouseEnL = (
    event: KonvaEventObject<MouseEvent>,
    isClicked: boolean,
    strokeWidth: number,
  ) => {
    // for mouse Enter and Leave
    // function to set the stroke width when user hovers over a Tile
    if (isClicked === true) {
      event.target.setAttr('strokeWidth', 0);
    } else {
      event.target.setAttr('strokeWidth', strokeWidth);
    }
  };

  const handleDragOver = (event: React.DragEvent) => event.preventDefault();

  const handleDragStart = (event: React.DragEvent) => {
    // use HTML DnD API to send Tile Information
    const tile = allTiles.find(
      (tile) => tile.name === event.currentTarget.getAttribute('data-name'),
    );

    if (tile) {
      const { _id, name, src, color, points, textPosition } = tile;
      const dragPayload = JSON.stringify({
        nodeClass: event.currentTarget.getAttribute('data-class'),
        offsetX: event.nativeEvent.offsetX,
        offsetY: event.nativeEvent.offsetY,
        clientWidth: event.currentTarget.clientWidth,
        clientHeight: event.currentTarget.clientHeight,
        id: uuidv4(),
        _id: _id,
        src: src,
        name: name,
        color: color,
        points: points,
        textPosition: textPosition,
      });
      event.dataTransfer.setData('dragStart/Tile', dragPayload);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    // add Tile to stage
    event.preventDefault();
    const draggedData = event.dataTransfer.getData('dragStart/Tile');
    if (draggedData && stageRef.current != null) {
      stageRef.current.setPointersPositions(event);
      const { x, y } = stageRef.current.getRelativePointerPosition();
      const {
        id,
        _id,
        src,
        color,
        textPosition,
        name,
        points,
        nodeClass,
        offsetX,
        offsetY,
        clientHeight,
        clientWidth,
      } = JSON.parse(draggedData);
      if (x && y) {
        const newTile: Tile = {
          id: id,
          _id: _id,
          src: src,
          category: nodeClass,
          x: x - (offsetX - clientWidth / 2),
          y: y - (offsetY - clientHeight / 2),
          name: name,
          color: color,
          points: points,
          width: clientWidth,
          height: clientHeight,
          textPosition: textPosition,
        };
        setTiles(newTile);
        if (socket !== null && roomId && userColor) {
          const socketDragTile: SocketDragTile = {
            remoteUser: socket.id,
            tile: newTile,
            roomId: roomId,
            remoteUserColor: userColor,
          };
          socket?.emit('tile-drop', socketDragTile);
        }
      }
    }
  };

  const updateTilePosition = (event: KonvaEventObject<DragEvent>) => {
    /**
     * updates the Tile position in the state
     * also clears the active Drag Element
     */

    const {
      'data-src': src,
      'data-fill': color,
      'data-id': _id,
      'data-points': points,
      'data-textPosition': textPosition,
    } = event.target.attrs;
    if (stageRef.current) {
      const rect = event.currentTarget.getClientRect();
      const updatedTile: Tile = {
        _id: _id,
        src: src,
        color: color,
        points: points,
        width: rect.width,
        x: event.target.x(),
        y: event.target.y(),
        height: rect.height,
        id: event.target.attrs.id,
        textPosition: textPosition,
        name: event.target.attrs.name,
        category: event.target.attrs.name,
      };
      updateTile(updatedTile);
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

  const setActiveDragElement = (
    activeTileReference: React.RefObject<Group>,
    event: KonvaEventObject<DragEvent>,
  ) => {
    setActiveDragTile(activeTileReference);

    if (stageRef.current) {
      // TODO: fix missing attribute
      const {
        'data-src': src,
        'data-fill': color,
        'data-id': _id,
        'data-points': points,
        'data-textPosition': textPosition,
      } = event.target.attrs;
      const rect = event.currentTarget.getClientRect();
      const stage = stageRef.current;
      const pos = stage.getRelativePointerPosition();
      const updatedTile: Tile = {
        _id: _id,
        src: src,
        color: color,
        points: Array.from(points),
        width: rect.width,
        x: event.target.x(),
        y: event.target.y(),
        height: rect.height,
        id: event.target.attrs.id,
        textPosition: JSON.parse(textPosition),
        name: event.target.attrs.name,
        category: event.target.attrs.name,
      };
      if (socket !== null && roomId && userColor) {
        const socketDragTile: SocketDragTile = {
          remoteUser: socket.id,
          tile: updatedTile,
          roomId: roomId,
          remoteUserColor: userColor,
        };
        const cursorPos = {
          x: pos?.x,
          y: pos?.y,
          remoteUser: socket.id,
          roomId: roomId,
        };
        socket?.emit('tile-drag', socketDragTile);
        socket?.emit('cursor', cursorPos);
      }
    }
  };

  const handleBoardDrag = () => {
    if (contextMenuOpen === true) {
      setContextMenuOpen(false);
    }
  };

  return {
    handleBoardDrag,
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
