import { useCallback } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { useWebSocketState } from '../state/WebSocketState';
import { useContextMenuState } from '../state/ContextMenuState';
import { useConnectedTilesState } from '../state/SyntaxTreeState';

export const useContextMenu = () => {
  const { room, socket } = useWebSocketState((state) => state);
  const contextMenu = useContextMenuState((state) => state.contextMenuOpen);
  const {
    contextMenuAnchorPoint,
    setContextMenuOpen,
    setLineContextMenuOpen,
    setContextMenuAnchorPoint,
  } = useContextMenuState((state) => state);
  const removeConnection = useConnectedTilesState((state) => state.removeConnection);

  const handleContextMenu = (
    event: KonvaEventObject<PointerEvent>,
    stateFunc: (value: boolean) => void,
  ) => {
    event.evt.preventDefault();
    stateFunc(true);

    setContextMenuAnchorPoint({
      x: event.evt.pageX,
      y: event.evt.pageY,
      // id of parent is for TIles, id of target is for Lines
      id: event.target.parent?.id() ? event.target.parent.id() : event.target.attrs.id,
    });
  };

  const handleClick = useCallback(() => {
    const deleteData = {
      id: contextMenuAnchorPoint.id,
      roomId: room?.roomId,
    };
    setContextMenuOpen(false);
    socket && socket.emit('tile-delete', deleteData);
  }, []);

  const handleRemoveLine = () => {
    removeConnection(contextMenuAnchorPoint.id);
    const deleteData = {
      id: contextMenuAnchorPoint.id,
      roomId: room?.roomId,
    };
    setLineContextMenuOpen(false);
    socket && socket.emit('line-delete', deleteData);
  };

  return { contextMenu, handleContextMenu, handleClick, handleRemoveLine, contextMenuAnchorPoint };
};
