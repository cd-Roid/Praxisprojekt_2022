import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocketState } from '../../state/WebSocketState';

const Disconnect = () => {
  const socket = useWebSocketState((state) => state.socket);
  const navigate = useNavigate();

  const disconnect = () => {
    socket?.disconnect();
    navigate('/');
  };

  return (
    // Disconnect Button
    <div
      className='bg-red-500  px-4 py-2 rounded-xl text-white cursor-pointer'
      onClick={disconnect}
    >
      Verlassen
    </div>
  );
};

export default Disconnect;
