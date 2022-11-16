import React from 'react';
import LogoMobile from '../assets/logos/logo-short.png';
import LogoDesktop from '../assets/logos/INTIA_Plattform_Logo_Horizontal_Kurz.png';

const Header = () => {
  return (
    <nav className='flex justify-between items-center h-auto w-full'>
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

    // <nav className='w-full'>
    //   <div className='flex flex-row justify-between'>
    //     <div className='w-fit'>
    //       <img className='w-40 h-auto p-4 hidden desktop:block' src={LogoDesktop} />
    //       <img className='w-12 h-auto p-2 desktop:hidden' src={LogoMobile} />
    //     </div>

    //     <div className='hidden tablet:block desktop:block py-2 w-1/4'>
    //       <ul className='flex justify-evenly'>
    //         <li>
    //           <a className='text-base' href='#'>
    //             Alle Kacheln
    //           </a>
    //         </li>
    //         <li>
    //           <a className='text-base' href='#'>
    //             Neue Kachel
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
  );
};

export default Header;
