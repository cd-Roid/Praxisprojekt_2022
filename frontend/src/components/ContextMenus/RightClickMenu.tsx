import React from 'react';
import { useBoardState } from '../../state/BoardState';
import { useContextMenu } from '../../hooks/useContextMenu';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RightClickMenu = () => {
  const { contextMenuAnchorPoint, handleClick } = useContextMenu();
  const removeTile = useBoardState((state) => state.removeTile);

  const handleRemoveTile = () => {
    removeTile(contextMenuAnchorPoint.id);
    handleClick();
  };

  return (
    <div
      onClick={handleRemoveTile}
      className='w-40 h-auto bg-slate-50 z-50 rounded'
      style={{
        position: 'absolute',
        left: `${contextMenuAnchorPoint.x}px`,
        top: `${contextMenuAnchorPoint.y}px`,
      }}
    >
      <ul className='w-auto h-full rounded'>
        <li className='rounded p-4 border-grey border-b-2 flex justify-evenly hover:bg-slate-200 hover:cursor-pointer'>
          <p className='text-black'>Remove Tile</p>
          <FontAwesomeIcon className='p-1 text-black' icon={faTrashCan} />
        </li>
      </ul>
    </div>
  );
};

export default RightClickMenu;
