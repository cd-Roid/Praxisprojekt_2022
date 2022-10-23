import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocketState } from '../../state/WebSocketState';
import Default from '../Buttons/Default';

const InfoComponent = () => {
  const socket = useWebSocketState((state) => state.socket);
  const navigate = useNavigate();

  const disconnect = () => {
    socket?.disconnect();
    navigate('/');
  };
  // Component that displays the connected users and Disconnect Button
  return (
    <div className='absolute right-24 w-fit flex justify-between bg-slate-200  p-4 rounded-b-xl'>
      <Default text='Verlassen' onClick={disconnect} isDanger={true} />
    </div>
  );
};

export default InfoComponent;
