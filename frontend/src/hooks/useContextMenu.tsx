import { useCallback } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { useWebSocketState } from '../state/WebSocketState';
import { useContextMenuState } from '../state/ContextMenuState';

export const useContextMenu = () => {
  const room = useWebSocketState((state) => state.room);
  const socket = useWebSocketState((state) => state.socket);
  const contextMenu = useContextMenuState((state) => state.contextMenuOpen);
  const setContextMenuOpen = useContextMenuState((state) => state.setContextMenuOpen);
  const contextMenuAnchorPoint = useContextMenuState((state) => state.contextMenuAnchorPoint);
  const setContextMenuAnchorPoint = useContextMenuState((state) => state.setContextMenuAnchorPoint);

  const handleContextMenu = (event: KonvaEventObject<PointerEvent>) => {
    event.evt.preventDefault();
    setContextMenuOpen(true);
    if (event.target.parent?.id()) {
      setContextMenuAnchorPoint({
        x: event.evt.pageX,
        y: event.evt.pageY,
        id: event.target.parent.id(),
      });
    }
  };

  const handleClick = useCallback(() => {
    socket && socket.emit('tile-delete', { id: contextMenuAnchorPoint.id, room });
    contextMenu && setContextMenuOpen(false);
  }, []);

  return { contextMenu, handleContextMenu, handleClick, contextMenuAnchorPoint };
};
