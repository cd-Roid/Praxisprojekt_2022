import React from 'react';
import LogoMobile from '../assets/logos/logo-short.png';
import { faHome, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoDesktop from '../assets/logos/INTIA_Plattform_Logo_Horizontal_Kurz.png';
import { useNavigate } from 'react-router';
import { handleClick } from '../hooks/useNavigation';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className='flex bg-white justify-between items-center h-16 w-full sticky top-0 z-50 shadow-md'>
      <div className='item w-32'>
        <img className='w-40 h-auto p-4 hidden desktop:block' src={LogoDesktop} />
        <img className='w-12 h-auto p-2 desktop:hidden' src={LogoMobile} />
      </div>
      <div className='item w-fit tablet:w-1/4'>
        <ul className='hidden tablet:flex justify-around '>
          <li>
            <a className='text-sm cursor-pointer' onClick={() => handleClick('', navigate)}>
              Alle Kacheln
            </a>
          </li>
          <li>
            <p className='text-sm cursor-pointer' onClick={() => handleClick('newTile', navigate)}>
              Neue Kachel
            </p>
          </li>
        </ul>
        <ul className='flex flex-row tablet:hidden justify-around'>
          <li>
            <a className='text-lg'>
              <FontAwesomeIcon
                className='p-4 cursor-pointer text-black'
                icon={faHome}
                onClick={() => handleClick('', navigate)}
              />
            </a>
          </li>
          <li>
            <a className='text-lg'>
              <FontAwesomeIcon
                className='p-4 font cursor-pointer text-black'
                icon={faTrash}
                onClick={() => handleClick('newTile', navigate)}
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
