import React from 'react';

type InputProps = {
  withButton?: boolean;
  buttonText?: string;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ withButton, buttonText, placeholder }) => {
  return (
    <div className='w-full h-2/3 mb-3'>
      {withButton && buttonText ? (
        <div className='h-full'>
          <input
            className='w-[75%] h-full  p-1 bg-grey border-2 border-grey rounded-l-full focus:outline-none  placeholder:text-left placeholder:pl-4'
            type='text'
            placeholder={placeholder}
          />
          <button className='w-[25%] p-[6px]  text-white  bg-main rounded-r-full'>
            {buttonText}
          </button>
        </div>
      ) : (
        <input
          className='bg-grey w-full p-1  border-2 border-grey rounded-full focus:outline-none placeholder:text-left placeholder:pl-4'
          type='text'
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
