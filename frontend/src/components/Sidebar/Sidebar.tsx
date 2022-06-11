import React, { ReactNode } from 'react';
import kacheln from '../../json/kacheln.json';
import Category from './Category';

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const categories = kacheln.map((c) => <Category item={c} />);
  return (
    <div className="absolute px-4 bg-gray-100 w-screen h-24 bottom-0">
      {categories}
    </div>
  );
};

export default Sidebar;
