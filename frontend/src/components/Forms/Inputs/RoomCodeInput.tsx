import React from 'react';
import Input from './Input';

type RoomCodeInputProps = {
  value: string;
  className?: string;
};

const RoomCodeInput: React.FC<RoomCodeInputProps> = ({ value, className }) => {
  return (
    <div className={className}>
      <p className='text-small pb-2'>Raumnummer</p>
      <Input value={value} readOnly={true} placeholder='Raumnummer' />
    </div>
  );
};

export default RoomCodeInput;
