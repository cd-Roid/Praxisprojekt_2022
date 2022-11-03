import Tab from './Tab';
import Category from './Category';
import data from '../../json/kacheln.json';
import React, { useState, useEffect } from 'react';
import { useBoardState } from '../../state/BoardState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const allTiles = useBoardState((state) => state.allTiles);
  const setAllTiles = useBoardState((state) => state.setAllTiles);
  const categoriesOpen = useBoardState((state) => state.categoriesOpen);
  const setCategoriesOpen = useBoardState((state) => state.setCategoriesOpen);
  const [toggleState, setToggleState] = useState(0);
  const [tabs, setTabs] = useState<string[]>();

  const toggleTab = (index: number) => {
    setCategoriesOpen(true);
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
        className={
          toggleState === index && categoriesOpen
            ? 'first-line:text-main font-bold mb-4'
            : 'mb-4 font-normal'
        }
        onClick={() => toggleTab(index)}
      >
        <Tab tabText={category} />
      </div>
    ));

  const categoryField =
    tabs &&
    tabs.map((category: string, index: number) => (
      <div key={index} className={toggleState === index ? 'content  active-content ' : 'hidden'}>
        <Category category={category} />
      </div>
    ));

  return (
    <>
      <div className='absolute flex flex-col bg-slate-100 w-fit h-fit left-0 top-1/3 rounded-md drop-shadow-lg'>
        <div className='m-4 cursor-pointer'>{tabComponents}</div>
      </div>
      <div className='absolute flex flex-row w-fit h-fit left-[124px] top-1/3 rounded-md'>
        {categoriesOpen && (
          <div className='bg-slate-100 flex-col justify-evenly drop-shadow-lg'>
            <FontAwesomeIcon
              className='p-4 float-right text-dark'
              icon={faXmark}
              onClick={() => setCategoriesOpen(false)}
            />
            <div>{categoryField}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
