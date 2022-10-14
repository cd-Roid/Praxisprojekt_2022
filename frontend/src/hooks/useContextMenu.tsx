import { useCallback } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { useBoardState } from '../state/BoardState';

export const useContextMenu = () => {
  const contextMenu = useBoardState((state) => state.contextMenuOpen);
  const setContextMenu = useBoardState((state) => state.setContextMenu);
  const contextMenuAnchorPoint = useBoardState((state) => state.contextMenuAnchorPoint);
  const setContextMenuAnchorPoint = useBoardState((state) => state.setContextMenuAnchorPoint);

  const handleContextMenu = useCallback(
    (event: KonvaEventObject<PointerEvent>) => {
      event.evt.preventDefault();
      setContextMenu(true);
      if (event.target.parent?.id()) {
        setContextMenuAnchorPoint({
          x: event.evt.pageX,
          y: event.evt.pageY,
          id: event.target.parent.id(),
        });
      }
    },
    [setContextMenu],
  );

  const handleClick = useCallback(
    () => (contextMenu ? setContextMenu(false) : null),
    [contextMenu],
  );

  return { contextMenu, handleContextMenu, handleClick, contextMenuAnchorPoint };
};
