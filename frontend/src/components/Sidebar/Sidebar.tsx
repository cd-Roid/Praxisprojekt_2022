import Tab from './Tab';
import Category from './Category';
import kacheln from '../../json/kacheln.json';
import { useToast } from '../../hooks/useToast';
import React, { useState, useEffect } from 'react';
import { useBoardState } from '../../state/BoardState';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar: React.FC = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const allTiles = useBoardState((state) => state.allTiles);
  const setAllTiles = useBoardState((state) => state.setAllTiles);
  const categoriesOpen = useBoardState((state) => state.categoriesOpen);
  const setCategoriesOpen = useBoardState((state) => state.setCategoriesOpen);
  const [toggleState, setToggleState] = useState(0);
  const [tabs, setTabs] = useState<string[]>();
  const { notify } = useToast();
  const toggleTab = (index: number) => {
    setCategoriesOpen(true);
    setToggleState(index);
  };

  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await fetch(`${backendUrl}`, {
    //       method: 'GET',
    //     });
    //     const data = await response.json();
    //     setAllTiles(data);
    //   } catch (error) {
    //     notify('error', 'There was an error fetching the tiles, please try again later', false);
    //   }
    // })();

    setAllTiles(kacheln as any);
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
      <div
        key={index}
        className={toggleState === index ? 'content  active-content  w-24 h-auto m-3' : 'hidden'}
      >
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
