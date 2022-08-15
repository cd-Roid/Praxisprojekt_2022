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

  const handleDragStart = (event: React.DragEvent) => {
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    const dragPayload = JSON.stringify({
      name: event.currentTarget.getAttribute('data-name'),
      nodeClass: event.currentTarget.getAttribute('data-class'),
      offsetX: offsetX,
      offsetY: offsetY,
    });

    event.dataTransfer.setData('dragStart/Tile', dragPayload);
  };

  useEffect(() => {
    const InnerObjectArray: InnerObject[] = [];
    data.forEach((object) => {
      object.category === category && InnerObjectArray.push(object);
    });
    setStateItems(InnerObjectArray);
  }, []);

  return (
    <div className='content-tabs  inline-flex'>
      {stateItems &&
        stateItems.map((tile, index: number) => (
          <div
            data-name={tile.name}
            data-class={category}
            className={`${category} m-4`}
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e)}
          >
            <Tile key={index} name={tile.name} category={category} />
          </div>
        ))}
    </div>
  );
};

export default Category;
