import React from 'react';
import Disconnect from '../Buttons/Disconnect';

const InfoComponent = () => {
  // Component that displays the connected users and Disconnect Button
  return (
    <div className='absolute right-24 w-fit flex justify-between bg-slate-200  p-4 rounded-b-xl'>
      <Disconnect />
    </div>
  );
};

export default InfoComponent;
