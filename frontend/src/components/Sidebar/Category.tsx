import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import Tile from '../Tile/Tile';

type CategoryProps = {
  items: {
    category: string;
    items: {
      name: string;
    }[];
  };
  onClickAction: () => void;
};

const Category: React.FC<CategoryProps> = ({ items, onClickAction }) => {
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (dragging === true) {
      console.log('Should create a new Element copy');
    }
  }, []);

  return (
    <div className='content-tabs  inline-flex' onClick={onClickAction}>
      {items.items.map((a, index) => (
        <Draggable key={index} onStart={() => setDragging(true)} onStop={() => setDragging(false)}>
          <div>
            <Tile key={index} name={a.name} category={items.category} />
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default Category;
