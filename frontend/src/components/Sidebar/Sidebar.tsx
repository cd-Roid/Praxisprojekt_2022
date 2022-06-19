import React, { useState } from 'react';
import data from '../../json/kacheln.json';
import Category from './Category';
import Tab from './Tab';

const Sidebar: React.FC = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const tabs = data.map((items, index) => (
    <div
      key={index}
      className={toggleState === index ? 'tabs active-tabs' : 'tabs'}
      onClick={() => toggleTab(index)}
    >
      <Tab tabText={items.category} />
    </div>
  ));

  const categoryField = data.map((c, index) => (
    <div key={index} className={toggleState === index ? 'content  active-content' : 'content'}>
      <Category items={c} onClickAction={() => toggleTab(index)} />
    </div>
  ));

  return (
    <div className='absolute w-screen h-24 bottom-0'>
      <div className='bloc-tabs'>{tabs}</div>
      <div className='content-tabs'>{categoryField}</div>
    </div>
  );
};

export default Sidebar;
