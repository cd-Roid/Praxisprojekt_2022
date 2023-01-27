import React from 'react';
import SetLamp from './MenuOptions/SetLamp';
import RemoveTile from './MenuOptions/RemoveTile';
import { useBoardState } from '../../state/BoardState';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContextMenu } from '../../hooks/useContextMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContextMenuState } from '../../state/ContextMenuState';

const RightClickMenu = () => {
  const removeTile = useBoardState((state) => state.removeTile);
  const { contextMenuAnchorPoint, handleClick } = useContextMenu();
  const setPanelOpen = useContextMenuState((state) => state.setPanelOpen);
  const setContextMenuOpen = useContextMenuState((state) => state.setContextMenuOpen);

  const handleRemoveTile = () => {
    removeTile(contextMenuAnchorPoint.id);
    handleClick();
  };

  return (
    <div
      className='w-[256px] h-auto bg-slate-50 z-50 rounded drop-shadow'
      style={{
        position: 'absolute',
        left: `${contextMenuAnchorPoint.x}px`,
        top: `${contextMenuAnchorPoint.y}px`,
      }}
    >
      <div className='flex items-end justify-end w-full'>
        <FontAwesomeIcon
          className='p-2 text-black'
          onClick={() => setContextMenuOpen(false)}
          icon={faXmark}
        />
      </div>
      <ul className='w-[228px] h-full rounded my-4 mx-2'>
        <RemoveTile onclick={handleRemoveTile} />
        <SetLamp onclick={() => setPanelOpen(true)} />
      </ul>
    </div>
  );
};

export default RightClickMenu;
