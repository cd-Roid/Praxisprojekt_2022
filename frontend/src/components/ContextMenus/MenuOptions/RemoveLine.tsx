import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {
  onclick: () => void;
};

const RemoveTile: React.FC<Props> = ({ onclick }) => {
  return (
    <li className='py-2 w-full flex  justify-between' onClick={onclick}>
      <p className='text-black hover:text-main hover:cursor-pointer'>Verbindung aufheben</p>
      <FontAwesomeIcon className=' text-slate-500 w-2' icon={faTrash} />
    </li>
  );
};

export default RemoveTile;
