import React from 'react';

import RemoveLine from './MenuOptions/RemoveLine';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContextMenu } from '../../hooks/useContextMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContextMenuState } from '../../state/ContextMenuState';

const LineRightClickMenu = () => {
  const { contextMenuAnchorPoint, handleRemoveLine } = useContextMenu();
  const setLineContextMenuOpen = useContextMenuState((state) => state.setLineContextMenuOpen);

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
          onClick={() => setLineContextMenuOpen(false)}
          icon={faXmark}
        />
      </div>
      <ul className='w-[228px] h-full rounded my-4 mx-2'>
        <RemoveLine onclick={handleRemoveLine} />
      </ul>
    </div>
  );
};

export default LineRightClickMenu;
