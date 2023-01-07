import React from 'react';
import useRandomColor from '../../hooks/useRandomColor';
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
  const { handleGenerate, color } = useRandomColor();

  React.useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className='mr-2'>
      <div
        style={{ backgroundColor: color }}
        data-tooltip-target='tooltip-bottom'
        data-tooltip-placement='bottom'
        className='h-8 w-8 font-semibold rounded-full flex items-center justify-center text-white'
      >
        {getInitials(userName)}
      </div>
    </div>
  );
};

export default UserDisplay;
