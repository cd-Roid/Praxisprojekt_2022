import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useWebSocketState } from '../../state/WebSocketState';
import Default from '../Buttons/Default';
import RoomCodeInput from './Inputs/RoomCodeInput';

const InfoComponent = () => {
  const socket = useWebSocketState((state) => state.socket);
  const navigate = useNavigate();
  const roomId = useWebSocketState((state) => state.room?.roomId);
  const users = useWebSocketState((state) => state.room?.users);

  const disconnect = () => {
    socket?.close();
    socket?.connect();
    navigate('/');
  };
  // Component that displays the connected users and Disconnect Button
  return (
    <div className='absolute  flex w-fit justify-between bg-slate-100 right-20 z-40 p-4 rounded-b-xl drop-shadow-lg'>
      <div className='p-4'>
        {users?.map((user) => (
          <FontAwesomeIcon
            className='w-7 h-7 px-1 text-main'
            key={user.userId}
            icon={faCircleUser}
          />
        ))}
      </div>
      {roomId && <RoomCodeInput className='px-4 text-xs font-semibold' value={roomId} />}
      <Default text='Verlassen' onClick={disconnect} isDanger={true} />
    </div>
  );
};

export default InfoComponent;
