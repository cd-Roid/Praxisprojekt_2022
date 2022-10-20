import React from 'react';
import LadinPageForm from '../components/Forms/LandingPageForm';
import LogoMobile from '../assets/logos/logo-short.png';
import LogoDesktop from '../assets/logos/INTIA_Plattform_Logo_Horizontal_Kurz.png';

const LandingPage = () => {
  return (
    <div className='flex flex-col w-screen h-screen desktop:flex-row '>
      <div className='w-full bg-white h-1/2 desktop:w-1/2 desktop:h-full'>
        <div className='h-full grid grid-cols-8 grid-rows-6'>
          <nav className='col-span-full'>
            <div className='hidden desktop:block'>
              <img className='w-40 h-auto p-4' src={LogoDesktop} />
            </div>
            <div className='desktop:hidden'>
              <img className='w-12 h-auto p-2' src={LogoMobile} />
            </div>
          </nav>
          <div className='col-start-2 col-span-full row-start-2 desktop:col-start-3 desktop:col-span-4 desktop:row-start-2'>
            <h1 className='text-h5 font-bold text-black mb-4 desktop:text-h1'>
              Digitales Prototyping Tool
            </h1>
          </div>
          <div className='mt-12 col-start-2 col-span-6 row-start-2 row-span-full desktop:col-start-3 desktop:col-span-4 desktop:row-start-4'>
            <LadinPageForm title='Room Erstellen' titleColor='#000000' />
          </div>
        </div>
      </div>
      <div className='w-full bg-dark  h-1/2 desktop:w-1/2 desktop:h-full'>
        <div className='h-full grid grid-cols-8 grid-rows-6'>
          <div className='mt-12  col-start-2 col-span-6 row-start-2 row-span-full desktop:col-start-3 desktop:col-span-4 desktop:row-start-4'>
            <LadinPageForm title='Room Erstellen' titleColor='#FFFFFF' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
