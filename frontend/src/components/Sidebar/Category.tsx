import React, { useEffect, useState } from 'react';
import { handleDragStart } from '../../hooks/useMouse';
import data from '../../json/kacheln.json';
import { InnerObject } from '../../types';
import MenuTile from '../Tiles/MenuTile';

type CategoryProps = {
  category: string;
};

const Category: React.FC<CategoryProps> = ({ category }) => {
  const [stateItems, setStateItems] = useState<InnerObject[]>([]);

  useEffect(() => {
    const InnerObjectArray: InnerObject[] = [];
    data.forEach((object) => {
      object.category === category && InnerObjectArray.push(object);
    });
    setStateItems(InnerObjectArray);
  }, [data]);

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
            <MenuTile {...tile} />
          </div>
        ))}
    </div>
  );
};

export default Category;
