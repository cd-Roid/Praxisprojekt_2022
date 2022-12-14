import React from 'react';

type ButtonProps = {
  buttonText: string;
  clickFunction?: () => void;
};

const Button: React.FC<ButtonProps> = ({ buttonText, clickFunction }) => {
  return (
    <button
      onClick={clickFunction}
      className='w-full text-center  py-2 text-white bg-main hover:bg-dark tablet:w-fit tablet:px-6'
      type='submit'
    >
      {buttonText}
    </button>
  );
};

export default Button;
