import React from 'react';
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
  return (
    <div
      className="content-tabs flex justify-between p-4"
      onClick={onClickAction}
    >
      {items.items.map((a, index) => (
        <Tile key={index} name={a.name} category={items.category} />
      ))}
    </div>
  );
};


export default Category;
