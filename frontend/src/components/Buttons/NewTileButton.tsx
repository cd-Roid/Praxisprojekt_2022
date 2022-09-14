import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddTileForm from '../Forms/AddTileForm';

const NewTileButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = (): void => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className='flex w-4 h-4 p-8 items-center justify-center rounded-full text-white font-bold cursor-pointer bg-green-700 hover:bg-green-800'
        onClick={toggleForm}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
      {isOpen && <AddTileForm closeForm={() => toggleForm()} />}
    </>
  );
};

export default NewTileButton;
