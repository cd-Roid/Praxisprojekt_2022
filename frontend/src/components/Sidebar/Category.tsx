import React from 'react';

type Props = {
  items: {};
};

const Category: React.FC<Props> = ({ items }) => {
  return <div className="content-tabs">{JSON.stringify(items)}</div>;
};


export default Category;
