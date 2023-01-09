import React from 'react';
import { useWebSocketState } from '../../state/WebSocketState';

type Props = {
  userName: string;
};

const UserDisplay: React.FC<Props> = ({ userName }) => {
  const userColor = useWebSocketState(
    (state) => state.room?.users.find((user) => user.userName === userName)?.color,
  );

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
        style={{ backgroundColor: userColor }}
        className='h-8 w-8 font-semibold rounded-full flex items-center justify-center text-black'
      >
        {getInitials(userName)}
      </div>
    </div>
  );
};

export default UserDisplay;