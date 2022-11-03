import React from 'react';
import { useNavigate } from 'react-router-dom';
import Default from '../components/Buttons/Default';

const NoMatch = () => {
  const navigate = useNavigate();
  const toHomePage = () => {
    navigate('/Praxisprojekt_2022/');
  };

  return (
    <div className='w-screen h-screen '>
      <div className='flex flex-col items-center p-24 justify-center h-full'>
        <p className='text-h5 font-bold mb-24 tablet:text-h2 '>
          Tut uns leid, da ist anscheinend was schief gelaufen.
        </p>
        <div className='w-fit'>
          <Default text='Zur Homepage' onClick={toHomePage} />
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
