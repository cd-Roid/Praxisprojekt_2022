import React, { useState, useEffect } from 'react';
import data from './json/kacheln.json';
import Sidebar from './components/Sidebar/Sidebar';
import Tile from './components/Tile/Tile';
import Draggable from 'react-draggable';
import { io, Socket } from 'socket.io-client';

type NewNode = {
  className: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
};

function App() {
  const [newNodes, setNewNodes] = useState<NewNode[]>([]);
  const [currentSocket, setCurrentSocket] = useState<Socket | null>(null);
  const [socketConnection, setSocketConnection] = useState<string>();
  const [remoteData, setRemoteData] = useState<NewNode[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:9001', { transports: ['websocket'] });
    socket.connect();
    socket.on('connect', () => setSocketConnection(`new Connection from ${socket.id}`));
    setCurrentSocket(socket);
  }, []);

  useEffect(() => {
    currentSocket?.on('new', (data) => {
      console.log('New remote node');
      setRemoteData((el) => el.concat(data));
    });
  }, [currentSocket]);

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/Tile');
    console.log(event.clientX, event.clientY);
    const nodeLookup = data.filter((el) => el.name === type);
    const node = {
      className: nodeLookup[0].category,
      name: nodeLookup[0].name,
      position: {
        x: event.clientX,
        y: event.clientY,
      },
    };
    currentSocket?.emit('new', node, () => console.log(node));
    setNewNodes((el) => el.concat(node));
  };

  return (
    <div className=' h-screen w-screen bg-gray-600'>
      <p className='absolute top-0 right-0 m-4'>{socketConnection}</p>
      <div className='h-screen w-screen bg-blue-300' onDrop={onDrop} onDragOver={onDragOver}>
        {newNodes.map(({ name, className, position }, index) => (
          <Draggable key={index}>
            <div style={{ left: `${position.x}px`, top: `${position.y}px` }} className={'absolute'}>
              <Tile name={name} category={className} />
            </div>
          </Draggable>
        ))}
        {remoteData.map(({ name, className, position }, index) => (
          <Draggable key={index}>
            <div style={{ left: `${position.x}px`, top: `${position.y}px` }} className={'absolute'}>
              <Tile name={name} category={className} />
            </div>
          </Draggable>
        ))}
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
