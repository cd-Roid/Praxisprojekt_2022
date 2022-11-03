import React from 'react';

type InputProps = {
  value?: string;
  readOnly?: boolean;
  withButton?: boolean;
  buttonText?: string;
  placeholder: string;
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Input: React.FC<InputProps> = ({
  withButton,
  changeHandler,
  clickHandler,
  buttonText,
  placeholder,
  value,
  readOnly,
}) => {
  return (
    <div className='w-full h-2/3 mb-3'>
      {withButton && buttonText ? (
        <div className='h-full'>
          <input
            readOnly={readOnly}
            onChange={changeHandler}
            className='w-[75%] h-full  p-1 bg-grey border-2 border-grey rounded-l-full focus:outline-none  placeholder:text-left placeholder:pl-4'
            type='text'
            placeholder={placeholder}
            value={value}
          />
          <button
            onClick={clickHandler}
            className='w-[25%] p-1  text-white  bg-main rounded-r-full'
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <input
          value={value}
          onChange={changeHandler}
          className='bg-grey w-full p-1  border-2 border-grey rounded-full focus:outline-none placeholder:text-left placeholder:pl-4'
          type='text'
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
