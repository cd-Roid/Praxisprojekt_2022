import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocketState } from '../../state/WebSocketState';
import Default from '../Buttons/Default';
import RoomCodeInput from './Inputs/RoomCodeInput';
import UserDisplay from '../UserDisplay/UserDisplay';
import { useCodeGeneration } from '../../hooks/useCodeGeneration';

const InfoComponent = () => {
  const navigate = useNavigate();
  const { generateCode } = useCodeGeneration();
  const socket = useWebSocketState((state) => state.socket);
  const roomId = useWebSocketState((state) => state.room?.roomId);
  const users = useWebSocketState((state) => state.room?.users);

  const disconnect = () => {
    socket?.close();
    socket?.connect();
    navigate('/');
  };
  // Component that displays the connected users and Disconnect Button
  return (
    <div className=' flex w-full justify-between bg-slate-100  p-4 '>
      <div className='p-4 flex justify-between'>
        {users?.map((user) => (
          <UserDisplay key={user.userId} userName={user.userName} />
        ))}
      </div>
      {roomId && <RoomCodeInput className='px-4 text-xs font-semibold' value={roomId} />}
      <Default text='Code' onClick={generateCode} />
      <Default text='Verlassen' onClick={disconnect} isDanger={true} />
    </div>
  );
};

export default InfoComponent;
