import Tab from './Tab';
import Category from './Category';
import data from '../../json/kacheln.json';
import React, { useState, useEffect } from 'react';
import { useBoardState } from '../../state/BoardState';

const Sidebar: React.FC = () => {
  const allTiles = useBoardState((state) => state.allTiles);
  const setAllTiles = useBoardState((state) => state.setAllTiles);
  const [toggleState, setToggleState] = useState(0);
  const [tabs, setTabs] = useState<string[]>();

  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  useEffect(() => {
    setAllTiles(data);
  }, []);

  useEffect(() => {
    const set: string[] = [];
    allTiles.length !== 0 &&
      allTiles.forEach((item) => {
        !set.includes(item.category) && set.push(item.category);
      });
    setTabs(set);
  }, [allTiles]);

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
