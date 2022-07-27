import React, { useEffect, useState } from 'react';
import data from '../../json/kacheln.json';
import { SocketProvider } from '../../providers/SocketProvider';
import Tile from '../Tile/Tile';

type InnerObject = {
  category: string;
  name: string;
};

type CategoryProps = {
  category: string;
};

const Category: React.FC<CategoryProps> = ({ category }) => {
  const [stateItems, setStateItems] = useState<InnerObject[]>([]);
  const { currentSocket } = SocketProvider();

  const onDragStart = (event: React.DragEvent, nodeName: string, nodeClass: string) => {
    localStorage.setItem('application/TileName', nodeName);
    localStorage.setItem('application/TileClass', nodeClass);
    event.dataTransfer.setData('application/TileName', nodeName);
    event.dataTransfer.setData('application/TileClass', nodeClass);
    event.dataTransfer.effectAllowed = 'move';
  };

  const drag = (event: React.DragEvent) => {
    const nodeName = localStorage.getItem('application/TileName');
    const nodeClass = localStorage.getItem('application/TileClass');
    const node = {
      name: nodeName,
      class: nodeClass,
      position: {
        x: event.clientX,
        y: event.clientY,
      },
    };
    currentSocket?.emit('node-dragging', node);
  };
  useEffect(() => {
    const a: InnerObject[] = [];
    data.forEach((object) => {
      object.category === category && a.push(object);
    });
    setStateItems(a);
  }, []);

  return (
    <div className='content-tabs  inline-flex'>
      {stateItems &&
        stateItems.map((a, index: number) => (
          <div
            className={`${category} m-4`}
            key={index}
            onDragStart={(e) => onDragStart(e, a.name, a.category)}
            onDrag={drag}
            draggable
          >
            <Tile key={index} name={a.name} category={category} />
          </div>
        ))}
    </div>
  );
};

export default Category;
