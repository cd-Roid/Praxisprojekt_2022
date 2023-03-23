import React from 'react';
import { SocketDragTile, Tile } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Group } from 'konva/lib/Group';
import { KonvaEventObject } from 'konva/lib/Node';
import { useBoardState } from '../state/BoardState';
import { useWebSocketState } from '../state/WebSocketState';
import { useContextMenuState } from '../state/ContextMenuState';
import { useConnectedTilesState } from '../state/SyntaxTreeState';

export const useMouse = () => {
  const setTiles = useBoardState((state) => state.addTile);
  const socket = useWebSocketState((state) => state.socket);
  const allTiles = useBoardState((state) => state.allTiles);
  const updateTile = useBoardState((state) => state.updateTile);
  const stageRef = useBoardState((state) => state.stageReference);
  const roomId = useWebSocketState((state) => state.room?.roomId);
  const setActiveDragTile = useBoardState((state) => state.setActiveDragTile);
  const setCategoriesOpen = useBoardState((state) => state.setCategoriesOpen);
  const contextMenuOpen = useContextMenuState((state) => state.contextMenuOpen);
  const userColor = useWebSocketState(
    (state) => state.room?.users.find((user) => user.userId === socket?.id)?.color,
  );
  const setContextMenuOpen = useContextMenuState((state) => state.setContextMenuOpen);
  const { fromShapeId, setFromShapeId, connections, setConnections } = useConnectedTilesState(
    (state) => state,
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
          roomId: roomId,
          remoteUser: socket.id,
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
      const {
        _id,
        src,
        name,
        color,
        width,
        height,
        points,
        anchors,
        category,
        astNode,
        textPosition,
      } = tile;
      const dragPayload = JSON.stringify({
        id: uuidv4(),
        _id: _id,
        src: src,
        name: name,
        color: color,
        width: width,
        height: height,
        points: points,
        anchors: anchors,
        astNode: astNode,
        category: category,
        textPosition: textPosition,
        offsetX: event.nativeEvent.offsetX,
        offsetY: event.nativeEvent.offsetY,
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
        name,
        color,
        width,
        points,
        height,
        anchors,
        offsetX,
        offsetY,
        category,
        astNode,
        textPosition,
      } = JSON.parse(draggedData);
      if (x && y) {
        const newTile: Tile = {
          id: id,
          _id: _id,
          src: src,
          name: name,
          width: width,
          color: color,
          height: height,
          points: points,
          anchors: anchors,
          astNode: astNode,
          category: category,
          textPosition: textPosition,
          x: x - (offsetX - width / 2),
          y: y - (offsetY - height / 2),
        };
        setTiles(newTile);
        if (socket !== null && roomId && userColor) {
          const socketDragTile: SocketDragTile = {
            tile: newTile,
            roomId: roomId,
            remoteUser: socket.id,
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
      'data-id': uid,
      'data-src': src,
      'data-fill': color,
      'data-width': width,
      'data-points': points,
      'data-height': height,
      'data-anchors': anchors,
      'data-category': tileName,
      'data-textPosition': textPosition,
    } = event.target.attrs;
    if (stageRef.current) {
      const updatedTile: Tile = {
        _id: uid,
        src: src,
        width: width,
        color: color,
        height: height,
        category: tileName,
        x: event.target.x(),
        y: event.target.y(),
        id: event.target.attrs.id,
        points: JSON.parse(points),
        textPosition: textPosition,
        anchors: JSON.parse(anchors),
        name: event.target.attrs.name,
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
      const {
        'data-id': _id,
        'data-src': src,
        'data-fill': color,
        'data-width': width,
        'data-height': height,
        'data-points': points,
        'data-anchors': anchors,
        'data-textPosition': textPosition,
      } = event.target.attrs;
      const stage = stageRef.current;
      const pos = stage.getRelativePointerPosition();
      const updatedTile: Tile = {
        _id: _id,
        src: src,
        color: color,
        width: width,
        height: height,
        anchors: anchors,
        x: event.target.x(),
        y: event.target.y(),
        id: event.target.attrs.id,
        points: Array.from(points),
        name: event.target.attrs.name,
        category: event.target.attrs.name,
        textPosition: JSON.parse(textPosition),
      };
      if (socket !== null && roomId && userColor) {
        const socketDragTile: SocketDragTile = {
          roomId: roomId,
          tile: updatedTile,
          remoteUser: socket.id,
          remoteUserColor: userColor,
        };
        const cursorPos = {
          x: pos?.x,
          y: pos?.y,
          roomId: roomId,
          remoteUser: socket.id,
        };
        socket?.emit('cursor', cursorPos);
        socket?.emit('tile-drag', socketDragTile);
      }
    }
  };

  const handleBoardDrag = () => {
    if (contextMenuOpen === true) {
      setContextMenuOpen(false);
    }
  };

  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    const { id, 'data-type': type } = event.target.attrs;

    if (fromShapeId === `${id}_${type}`) {
      setFromShapeId(null);
    }
    if (fromShapeId === null) {
      setFromShapeId(`${id}_${type}`);
    } else {
      if (fromShapeId !== `${id}_${type}`) {
        const newConnection = {
          from: `${fromShapeId}`,
          to: `${id}_${type}`,
        };
        setConnections([...connections, newConnection]);
        setFromShapeId(null);

        if (socket && roomId) {
          const tileConnection = {
            from: `${fromShapeId}`,
            to: `${id}_${type}`,
            roomId: roomId,
          };
          socket.emit('tile-connection', tileConnection);
        }
      }
    }
  };
  return {
    handleDrop,
    handleClick,
    handleWheel,
    toggleCategory,
    handleMouseEnL,
    handleDragOver,
    handleDragStart,
    handleBoardDrag,
    handleMouseMove,
    updateTilePosition,
    setActiveDragElement,
  };
};
