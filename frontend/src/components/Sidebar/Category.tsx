import React from 'react';

type Props = {
  item: {
    category: string;
    items: { name: string }[];
  };
};

const Category: React.FC<Props> = ({ item }) => {
  const items = item.items.map((a) => <div>{a.name}</div>);
  return (
    <div>
      {item.category}
      {items}
    </div>
  );
};

export default Category;
