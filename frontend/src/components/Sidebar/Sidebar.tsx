import Tab from './Tab';
import Category from './Category';
import data from '../../json/kacheln.json';
import React, { useState, useEffect } from 'react';
import { useBoardState } from '../../state/BoardState';
import NewTileButton from '../Buttons/NewTileButton';

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
        className={toggleState === index ? 'tabs active-tabs mb-4' : 'tabs mb-4'}
        onClick={() => toggleTab(index)}
      >
        <Tab tabText={category} />
      </div>
    ));

  const categoryField =
    tabs &&
    tabs.map((category: string, index: number) => (
      <div
        key={index}
        className={toggleState === index ? 'content  active-content bg-slate-200' : 'content'}
      >
        <Category category={category} />
      </div>
    ));

  return (
    <>
      <div className='absolute flex flex-col bg-slate-100 w-fit h-fit left-0 top-1/3 rounded-md'>
        <NewTileButton />
        <div className='m-2 cursor-pointer'>{tabComponents}</div>
      </div>
      <div className='absolute flex flex-row w-fit h-fit left-[124px] top-1/3 rounded-md'>
        <div className='content-tabs'>{categoryField}</div>
      </div>
    </>
  );
};

export default Sidebar;
