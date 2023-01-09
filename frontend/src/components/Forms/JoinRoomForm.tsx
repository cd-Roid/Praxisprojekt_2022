import React, { useEffect } from 'react';
import { useWebSocketState } from '../../state/WebSocketState';
import Input from './Inputs/Input';
import { RoomData } from '../../types';
import { useToast } from '../../hooks/useToast';
import { generateLightColorHex } from '../../utils/color';

type LandingPageFormProps = {
  title: string;
  titleColor: string;
  buttonText: string;
  inputText: string;
};

const JoinRoomForm: React.FC<LandingPageFormProps> = ({
  title,
  inputText,
  buttonText,
  titleColor,
}) => {
  const [userName, setUserName] = React.useState<string>('');
  const [roomId, setroomId] = React.useState<string>('');
  const socket = useWebSocketState((state) => state.socket);
  const setRoom = useWebSocketState((state) => state.setRoom);
  const { notify } = useToast();

  const handleUserInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    setStateFunc: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setStateFunc(event.target.value);
  };

  const joinRoom = (event: React.MouseEvent) => {
    event.preventDefault();
    const roomData = {
      roomId: roomId,
      userName: userName,
      userId: socket?.id,
      color: generateLightColorHex(),
      isHost: false,
    };
    socket?.emit('join-room', roomData);
  };

  useEffect(() => {
    if (socket !== null) {
      socket.on('new-user', (data: string) => {
        notify('success', `${data} has joined the room!`, false);
      });

      socket.on('join-success', (roomData: RoomData) => {
        notify('success', `Welcome ${userName}!`, true, `/room/${roomData.roomId}`);
        setRoom(roomData);
      });
      socket.on('join-failure', (msg: string) => {
        notify('error', msg, false);
      });
    }
  }, [socket]);

  return (
    <div>
      <h2 className='text-h5 mb-3 font-bold text-left tablet:text-h2' style={{ color: titleColor }}>
        {title}
      </h2>
      <form className='flex flex-col items-center justify-center w-full h-full m-auto'>
        <Input
          placeholder={inputText}
          value={userName}
          changeHandler={(e) => handleUserInput(e, setUserName)}
        />
        <Input
          withButton={true}
          value={roomId}
          placeholder={'Room Code'}
          changeHandler={(e) => handleUserInput(e, setroomId)}
          buttonText={buttonText}
          clickHandler={joinRoom}
        />
      </form>
    </div>
  );
};

export default JoinRoomForm;
