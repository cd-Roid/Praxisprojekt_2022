import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToggle } from '../../hooks/useToggle';

const NewTileButton: React.FC = () => {
  const { toggleForm } = useToggle();
  return (
    <>
      <div
        className='flex h-4 p-8 items-center justify-center w-full rounded-t-md  text-white font-bold cursor-pointer bg-green-700 hover:bg-green-800'
        onClick={toggleForm}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </>
  );
};

export default NewTileButton;
