import React from 'react';

type ButtonProps = {
  buttonText: string;
  clickFunction?: () => void;
};

const Button: React.FC<ButtonProps> = ({ buttonText }) => {
  return (
    <button
      className='w-full text-center  py-2 text-white bg-main hover:bg-dark tablet:w-fit tablet:px-6 mx-10 tablet:mx-0 desktop:m-0'
      type='submit'
    >
      {buttonText}
    </button>
  );
};

export default Button;
