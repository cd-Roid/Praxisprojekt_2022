import React, { ReactNode, useState } from 'react';
import kacheln from '../../json/kacheln.json';
import Category from './Category';
import Tab from './Tab';

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  return (
    <div className="absolute px-4 bg-gray-100 w-screen h-24 bottom-0 container">
      <div className="bloc-tabs">
        {kacheln.map((a, index) => (
          <Tab
            key={index}
            tabIndex={index}
            tabText={a.category}
            onClickAction={() => toggleTab(index)}
          />
        ))}
      </div>
      <div className="content-tabs">
        {kacheln.map((c, index) => (
          <div
            className={
              toggleState === index ? 'content  active-content' : 'content'
            }
          >
            <Category items={c} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
