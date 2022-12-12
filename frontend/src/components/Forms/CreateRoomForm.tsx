import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useWebSocketState } from '../../state/WebSocketState';
import Input from './Inputs/Input';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../types';

type LandingPageFormProps = {
  title: string;
  titleColor: string;
  buttonText: string;
  inputText: string;
};

const LandingPageForm: React.FC<LandingPageFormProps> = ({
  title,
  inputText,
  buttonText,
  titleColor,
}) => {
  const [roomId, setroomId] = React.useState<string>('');
  const [userName, setUserName] = React.useState<string>('');
  const socket = useWebSocketState((state) => state.socket);
  const addUser = useWebSocketState((state) => state.addUser);
  const setRoom = useWebSocketState((state) => state.setRoom);
  const navigate = useNavigate();

  const generateRoomId = () => {
    // create 6 digit uid
    const roomId = uuidv4().slice(0, 6);
    setroomId(roomId);
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const createRoom = (event: React.MouseEvent) => {
    event.preventDefault();

    const roomData = {
      roomId: roomId,
      userName: userName,
      userId: socket?.id as string,
      isHost: true,
    };
    socket?.emit('room-create', roomData);
  };

  useEffect(() => {
    generateRoomId();
  }, []);

  useEffect(() => {
    if (socket !== null) {
      socket.on('create-success', (roomData: UserData) => {
        setRoom({
          roomId: roomData.roomId,
          users: [
            {
              roomId: roomData.roomId,
              userId: roomData.userId,
              userName: roomData.userName,
              isHost: true,
              cursorPos: { x: 0, y: 0 },
            },
          ],
        });
        addUser({ userId: roomData.userId, userName: roomData.userName });
        navigate(`/Praxisprojekt_2022/room/${roomData.roomId}`);
      });
    }
  }, [socket]);

  return (
    <div>
      <h2 className='text-h5 mb-3 font-bold text-left tablet:text-h2' style={{ color: titleColor }}>
        {title}
      </h2>
      <form className='flex flex-col items-center justify-center w-full h-full m-auto'>
        <Input changeHandler={handleUserInput} placeholder={inputText} />
        <Input
          readOnly={true}
          withButton={true}
          value={roomId}
          placeholder={'Room Code'}
          buttonText={buttonText}
          clickHandler={createRoom}
        />
      </form>
    </div>
  );
};

export default LandingPageForm;
