import React from 'react';
import LadinPageForm from '../components/Forms/LandingPageForm';

const LandingPage = () => {
  return (
    <div className='flex flex-col w-screen h-screen desktop:flex-row '>
      <div className='w-full bg-dark h-1/2 desktop:w-1/2 desktop:h-full'>
        <div className='h-full grid grid-cols-8 grid-rows-6'>
          <div className='col-start-2 col-span-6 row-start-2 row-span-full desktop:col-start-3 desktop:col-span-4 desktop:row-start-4'>
            <LadinPageForm title='Room Erstellen' titleColor='#FFFFFF' />
          </div>
        </div>
      </div>
      <div className='w-full bg-blue-500 h-1/2 desktop:w-1/2 desktop:h-full'>
        <div className='h-full grid grid-cols-8 grid-rows-6'>
          <div className='col-start-2 col-span-6 row-start-2 row-span-full desktop:col-start-3 desktop:col-span-4 desktop:row-start-4'>
            <LadinPageForm title='Room Erstellen' titleColor='#000000' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
