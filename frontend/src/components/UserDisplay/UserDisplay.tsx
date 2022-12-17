import React from 'react';

type Props = {
  userName: string;
};

const UserDisplay: React.FC<Props> = ({ userName }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  };

  return (
    <div className='mr-2'>
      <div
        data-tooltip-target='tooltip-bottom'
        data-tooltip-placement='bottom'
        className='h-8 w-8 font-semibold rounded-full bg-main flex items-center justify-center text-white'
      >
        {getInitials(userName)}
      </div>
    </div>
  );
};

export default UserDisplay;
