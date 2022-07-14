import React, { useState, useEffect } from 'react';
import data from './json/kacheln.json';
import Sidebar from './components/Sidebar/Sidebar';
import Tile from './components/Tile/Tile';
import Draggable from 'react-draggable';
import { io } from 'socket.io-client';

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
  const [socketConnection, setSocketConnection] = useState<string>();

  useEffect(() => {
    const client = io('http://localhost:9001', { transports: ['websocket'] });
    client.on('connect', () => setSocketConnection(`new Connection from ${client.id}`));
  }, []);

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
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
