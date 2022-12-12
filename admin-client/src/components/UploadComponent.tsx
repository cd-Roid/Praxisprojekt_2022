import React from 'react';
import Upload from '../components/UploadField';
import Input from '../components/Input';
import Button from '../components/Button';
import { Tile as TileType } from '../types/apiTypes';

const UploadComponent: React.FC<TileType> = ({ name, url, category }) => {
  return (
    <div className='w-full h-auto mx-auto flex justify-center align-middle'>
      <div className='w-full mx-6 my-16 tablet:border border-black max-w-4xl '>
        <div className='tablet:w-full tablet:flex tablet:flex-row tablet:justify-around '>
          <div className='my-12 mx-6 flex flex-col justify-center align-middle'>
            {url !== undefined && <Upload />}
            <div className='mt-3 flex flex-col'>
              {name !== undefined && <Input label='Name' placeHolder={name} />}
              {category !== undefined && <Input label='Category' placeHolder={category} />}
            </div>
          </div>
          <div className='hidden tablet:block'>
            <div className='border border-black min-w-fit h-fit flex justify-center align-middle max-w-sm my-12'>
              <img className='p-8' src={url} />
            </div>
          </div>
        </div>
        <div className='mx-10 flex flex-col justify-center align-middle tablet:justify-end tablet:mx-20 tablet:mb-6'>
          <Button buttonText='Update' />
        </div>
      </div>
    </div>
  );
};

export default UploadComponent;
