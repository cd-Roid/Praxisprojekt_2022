import React from 'react';
import Input from './Inputs/Input';

type LandingPageFormProps = {
  title: string;
  titleColor: string;
};

const LandingPageForm: React.FC<LandingPageFormProps> = ({ title, titleColor }) => {
  return (
    <div>
      <h2 className='text-h5 mb-3 font-bold text-left tablet:text-h2' style={{ color: titleColor }}>
        {title}
      </h2>
      <form className='flex flex-col items-center justify-center w-full h-full m-auto'>
        <Input placeholder={'Room Name'} />
        <Input placeholder={'User Name'} />
        <Input withButton={true} placeholder={'Room Code'} buttonText={'Create'} />
      </form>
    </div>
  );
};

export default LandingPageForm;
