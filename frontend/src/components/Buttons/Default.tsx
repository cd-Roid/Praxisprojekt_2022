import React from 'react';

type DefaultButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  isDanger?: boolean;
};

const Default: React.FC<DefaultButtonProps> = ({ text, onClick, isDanger }) => {
  return (
    // Default Button with different styles
    <div
      className={`${
        isDanger ? 'bg-red-500 hover:bg-red-800' : 'bg-main hover:bg-dark'
      } p-2  text-white font-semibold py-2 px-4 rounded-full h-12`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Default;
