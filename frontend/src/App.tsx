import React, { useState, useEffect, Component } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Cursor from './components/Cursor/Cursor';
import Tile from './components/Tile/Tile';
import { SocketProvider } from './providers/SocketProvider';
import Draggable from 'react-draggable';
import { NewNode, CursorData } from './types';

function App() {
  const [newNodes, setNewNodes] = useState<NewNode[]>([]);
  const { currentSocket, socketString } = SocketProvider();
  const [remoteData, setRemoteData] = useState<NewNode[]>([]);
  const [cursor, setCursor] = useState<CursorData | null>(null);

  useEffect(() => {
    currentSocket?.on('new', (data: NewNode) => {
      console.log('New remote node');
      setRemoteData((el) => el.concat(data));
    });
    currentSocket?.on('cursor', (data: CursorData) => {
      setCursor(data);
    });
  }, [currentSocket]);

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const nodeName = event.dataTransfer.getData('application/TileName');
    const nodeClass = event.dataTransfer.getData('application/TileClass');
    console.log(event.clientX, event.clientY);
    const node = {
      className: nodeClass,
      name: nodeName,
      position: {
        x: event.clientX,
        y: event.clientY,
      },
    };
    currentSocket?.emit('new', node, () => console.log(node));
    // setNewNodes((el) => el.concat(node));
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const cursor = {
      x: event.pageX,
      y: event.pageY,
    };
    currentSocket?.emit('cursor', cursor);
  };

  return (
    <div className=' h-screen w-screen bg-gray-600' onMouseMove={handleMouseMove}>
      <p className='absolute top-0 right-0 m-4'>{socketString}</p>
      {cursor && <Cursor x={cursor.x} y={cursor.y} />}
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
