import React from 'react';

type InputProps = {
  label: string;
  value?: string;
  required?: boolean;
  placeHolder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ label, placeHolder, onChange, value, required }) => {
  return (
    <>
      <label className='text-base font-bold mx-4 tablet:mx-0' htmlFor='name'>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        required={required}
        className='max-w-xs border-black border-0 border-b-2 outline-none mt-2 mx-4 tablet:mx-0 mb-3'
        type='text'
        name='name'
        id='input-name'
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
