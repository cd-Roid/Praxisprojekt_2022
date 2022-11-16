import React from 'react';
import LogoMobile from '../assets/logos/logo-short.png';
import LogoDesktop from '../assets/logos/INTIA_Plattform_Logo_Horizontal_Kurz.png';

const Header = () => {
  return (
    <nav className='flex bg-white justify-between items-center h-auto w-full sticky top-0 z-50'>
      <div className='item w-32'>
        <img className='w-40 h-auto p-4 hidden desktop:block' src={LogoDesktop} />
        <img className='w-12 h-auto p-2 desktop:hidden' src={LogoMobile} />
      </div>
      <div className='item w-fit tablet:w-1/4'>
        <ul className='hidden tablet:flex justify-around '>
          <li>
            <a className='text-sm' href='#'>
              Alle Kacheln
            </a>
          </li>
          <li>
            <a className='text-sm' href='#'>
              Neue Kachel
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
