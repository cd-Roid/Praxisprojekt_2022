import React from 'react';

type InputProps = {
  label: string;
  placeHolder: string;
};

const Input: React.FC<InputProps> = ({ label, placeHolder }) => {
  return (
    <>
      <label className='text-base font-bold mx-4' htmlFor='name'>
        {label}
      </label>
      <input
        className='max-w-xs border-black border-0 border-b-2 outline-none mt-2 mx-4 tablet:mx-0 mb-3'
        type='text'
        name='name'
        id='input-name'
        placeholder={placeHolder}
      />
    </>
  );
};

export default Input;
