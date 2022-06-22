import React, { useEffect, useState } from 'react';
import data from '../../json/kacheln.json';
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

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/Tile', nodeType);
    event.dataTransfer.effectAllowed = 'move';
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
            className={`${category}`}
            key={index}
            onDragStart={(e) => onDragStart(e, a.name)}
            draggable
          >
            <Tile key={index} name={a.name} category={category} />
          </div>
        ))}
    </div>
  );
};

export default Category;
