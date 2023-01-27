import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useContextMenuState } from '../../state/ContextMenuState';
import Tile from '../Tiles/Tile';

const SelectLampForm = () => {
  const [selectedLamp, setSelectedLamp] = React.useState('');
  const lamps = ['Floor Lamp', 'Table Lamp', 'Desk Lamp', 'Ceiling Lamp', 'Bedside Lamp'];
  const panelOpen = useContextMenuState((state) => state.panelOpen);
  const setPanelOpen = useContextMenuState((state) => state.setPanelOpen);

  const closePanel = () => {
    if (panelOpen) setPanelOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {panelOpen === true && (
        <div className='absolute flex items-start space-x-2 top-4 right-0 z-40 w-1/3 rounded-b-xl drop-shadow-lg'>
          <FontAwesomeIcon
            className=' text-slate-500 w-4 h-auto px-2'
            onClick={closePanel}
            icon={faXmark}
          />
          <form className='flex flex-col w-full  bg-gray-100 justify-end'>
            <div className='p-4'>
              <h2 className='text-h4 py-2 text-bold '>Wähle eine Lampe aus</h2>
              <div className='relative inline-block w-full text-gray-700 py-2'>
                <select
                  className='w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline'
                  placeholder='Regular input'
                  value={selectedLamp}
                  onChange={(e) => setSelectedLamp(e.target.value)}
                >
                  {lamps.map((lamp) => (
                    <option key={lamp} value={lamp}>
                      {lamp}
                    </option>
                  ))}
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                  <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                    <path
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                      fillRule='evenodd'
                    ></path>
                  </svg>
                </div>
              </div>
              <div className='py-4'>
                <button className='h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-main rounded-lg focus:shadow-outline hover:bg-dark'>
                  Auswählen
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SelectLampForm;
