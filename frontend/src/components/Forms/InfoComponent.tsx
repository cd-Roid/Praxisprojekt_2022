import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocketState } from '../../state/WebSocketState';
import Default from '../Buttons/Default';
import RoomCodeInput from './Inputs/RoomCodeInput';
import UserDisplay from '../UserDisplay/UserDisplay';

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
      <div className='p-4 flex justify-between'>
        {users?.map((user) => (
          <UserDisplay key={user.userId} userName={user.userName} />
        ))}
      </div>
      {roomId && <RoomCodeInput className='px-4 text-xs font-semibold' value={roomId} />}
      <Default text='Verlassen' onClick={disconnect} isDanger={true} />
    </div>
  );
};

export default InfoComponent;
