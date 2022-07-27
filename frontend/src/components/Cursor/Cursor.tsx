import React, { useState, useEffect } from 'react';
import { SocketProvider } from '../../providers/SocketProvider';
import { NewNode } from '../../types';
import Tile from '../Tile/Tile';

type CursorProps = {
  x: number;
  y: number;
};

const Cursor = ({ x, y }: CursorProps) => {
  const { currentSocket } = SocketProvider();
  const [draggingTile, setDraggingTile] = useState<NewNode | null>(null);

  useEffect(() => {
    currentSocket?.on('node-dragging', (data: NewNode) => setDraggingTile(data));
  }, [currentSocket]);

  return (
    <>
      <div style={{ left: x, top: y }} className='w-2 h-3 bg-red-400 absolute'>
        Cursor
      </div>
      {draggingTile && (
        <Tile
          name={draggingTile.name}
          category={draggingTile.className}
          styles={{ left: draggingTile.position.x, top: draggingTile.position.y }}
        />
      )}
    </>
  );
};

export default Cursor;
