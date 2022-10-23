import React from 'react';
import { useToggle } from '../../hooks/useToggle';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewTileButton: React.FC = () => {
  const { toggleForm } = useToggle();
  return (
    <>
      <div
        className='flex h-4 p-8 items-center justify-center w-full rounded-t-md  text-white font-bold cursor-pointer bg-main hover:bg-dark'
        onClick={toggleForm}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </>
  );
};

export default NewTileButton;
