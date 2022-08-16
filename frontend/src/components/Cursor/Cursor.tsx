import React, { useState, useEffect } from 'react';
import { useWebSockets } from '../../hooks/useWebSockets';
import { NewNode } from '../../types';
import Tile from '../Tiles/Tile';

type CursorProps = {
  x: number;
  y: number;
};

const Cursor: React.FC<CursorProps> = ({ x, y }) => {
  const { currentSocket } = useWebSockets();
  const [draggingTile, setDraggingTile] = useState<NewNode | null>(null);

  useEffect(() => {
    currentSocket?.on('node-dragging', (data: NewNode) => setDraggingTile(data));
  }, [currentSocket]);

  return (
    <>
      <div style={{ left: x, top: y }} className='w-2 h-3 bg-red-400 absolute'>
        Cursor
      </div>
    </>
  );
};

export default Cursor;
