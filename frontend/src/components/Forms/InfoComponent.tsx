import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocketState } from '../../state/WebSocketState';
import Default from '../Buttons/Default';

const InfoComponent = () => {
  const socket = useWebSocketState((state) => state.socket);
  const navigate = useNavigate();

  const disconnect = () => {
    socket?.disconnect();
    navigate('/Praxisprojekt_2022/');
  };
  // Component that displays the connected users and Disconnect Button
  return (
    <div className='absolute  flex w-fit justify-between bg-slate-200 right-20 z-40 p-4 rounded-b-xl'>
      <Default text='Verlassen' onClick={disconnect} isDanger={true} />
    </div>
  );
};

export default InfoComponent;
