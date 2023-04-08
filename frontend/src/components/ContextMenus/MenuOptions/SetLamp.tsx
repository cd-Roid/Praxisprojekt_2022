import React from 'react';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  onclick: () => void;
};

const SetLamp: React.FC<Props> = ({ onclick }) => {


  return (
    <li className='py-2 flex justify-between' onClick={onclick}>
      <p className='text-black hover:text-main hover:cursor-pointer'>Lampe auswählen</p>
      <FontAwesomeIcon className=' text-slate-500 w-2 h-auto' icon={faLightbulb} />
    </li>
  );
};

export default SetLamp;
