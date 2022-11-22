import React from 'react';

type ButtonProps = {
  buttonText: string;
  clickFunction?: () => void;
};

const Button: React.FC<ButtonProps> = ({ buttonText }) => {
  return (
    <button className='flex px-4 py-2 text-white bg-main hover:bg-dark' type='submit'>
      {buttonText}
    </button>
  );
};

export default Button;
