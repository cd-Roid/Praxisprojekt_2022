import React, { useState, useEffect } from 'react';
import data from '../../json/kacheln.json';
import Category from './Category';
import Tab from './Tab';

const Sidebar: React.FC = () => {
  const [toggleState, setToggleState] = useState(0);
  const [tabs, setTabs] = useState<string[]>();

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  useEffect(() => {
    const set: string[] = [];
    data.forEach((item) => {
      !set.includes(item.category) && set.push(item.category);
    });
    setTabs(set);
  }, []);

  const tabComponents =
    tabs &&
    tabs?.map((category, index) => (
      <div
        key={index}
        className={toggleState === index ? 'tabs active-tabs' : 'tabs'}
        onClick={() => toggleTab(index)}
      >
        <Tab tabText={category} />
      </div>
    ));

  const categoryField =
    tabs &&
    tabs.map((category: string, index: number) => (
      <div key={index} className={toggleState === index ? 'content  active-content' : 'content'}>
        <Category category={category} />
      </div>
    ));

  return (
    <div className='absolute w-screen h-24 bottom-0'>
      <div className='bloc-tabs'>{tabComponents}</div>
      <div className='content-tabs'>{categoryField}</div>
    </div>
  );
};

export default Sidebar;
