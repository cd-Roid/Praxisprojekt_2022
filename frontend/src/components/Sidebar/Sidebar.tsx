import React, { ReactNode, useState } from 'react';
import data from '../../json/kacheln.json';
import Category from './Category';
import Tab from './Tab';

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const tabs = data.map((a, index) => (
    <div
      key={index}
      className={toggleState === index ? 'tabs active-tabs' : 'tabs'}
      onClick={() => toggleTab(index)}
    >
      <Tab tabText={a.category} />
    </div>
  ));

  const categoryField = data.map((c, index) => (
    <div
      key={index}
      className={toggleState === index ? 'content  active-content' : 'content'}
    >
      <Category items={c} onClickAction={() => toggleTab(index)} />
    </div>
  ));

  return (
    <div className="absolute  w-screen h-24 bottom-0">
      <div className="bloc-tabs">{tabs}</div>
      <div className="content-tabs">{categoryField}</div>
    </div>
  );
};

export default Sidebar;
