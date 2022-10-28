import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocketState } from '../../state/WebSocketState';
import Input from './Inputs/Input';
import { v4 as uuidv4 } from 'uuid';

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
  const [roomCode, setRoomCode] = React.useState<string>('');
  const socket = useWebSocketState((state) => state.socket);
  const navigate = useNavigate();

  const handleUserInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    setStateFunc: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setStateFunc(event.target.value);
  };

  const joinRoom = (event: React.MouseEvent) => {
    event.preventDefault();
    const roomData = {
      roomCode: roomCode,
      userName: userName,
      userId: uuidv4(),
    };
    socket?.emit('join-room', roomData);
  };

  useEffect(() => {
    if (socket !== null) {
      socket.on('join-success', (roomData) => {
        navigate(`/Praxisprojekt_2022/room/${roomData.roomCode}`);
      });
      socket.on('join-failure', () => {
        console.log('Could not join room');
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
          value={roomCode}
          placeholder={'Room Code'}
          changeHandler={(e) => handleUserInput(e, setRoomCode)}
          buttonText={buttonText}
          clickHandler={joinRoom}
        />
      </form>
    </div>
  );
};

export default JoinRoomForm;
