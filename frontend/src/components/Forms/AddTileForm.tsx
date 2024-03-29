import { InnerObject } from '../../types';
import { useToggle } from '../../hooks/useToggle';
import React, { useEffect, useState } from 'react';
import { useBoardState } from '../../state/BoardState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faX } from '@fortawesome/free-solid-svg-icons';
import { getTileType } from '../../hooks/useCategory';

type AddTileFormProps = {
  closeForm: () => void;
};

const AddTileForm: React.FC<AddTileFormProps> = ({ closeForm }) => {
  const { toggleForm } = useToggle();
  const [isOpen, setIsOpen] = useState(false);
  const allTiles = useBoardState((state) => state.allTiles);
  const setAllTiles = useBoardState((state) => state.setAllTiles);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(allTiles[0].category);
  const [selectedName, setSelectedName] = useState<string>();

  const setCategory = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  // TODO: Add a database to save the new Tiles to.
  const handleSubmit = () => {
    if (selectedName && selectedCategory) {
      const svgData = getTileType(selectedCategory);
      const newNode: InnerObject = {
        category: selectedCategory,
        name: selectedName,
        svgPath: svgData.svgPath,
        fill: svgData.fill,
        svgRotate: svgData.rotation,
        url: '',
      };
      setAllTiles([...allTiles, newNode]);
    }
    closeForm();
    setIsOpen(false);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSelectedName(event.currentTarget.value);
  };

  useEffect(() => {
    const categoryArray: Array<string> = [];
    const categorySet: Set<string> = new Set();
    allTiles.forEach((item) => {
      categorySet.add(item.category);
    });
    categorySet.forEach((item) => categoryArray.push(item));
    setCategories(categoryArray);
  }, []);

  return (
    <div className='w-fit max-w-xs z-40 absolute top-1/3 left-[40%]'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-40'>
        <div className='flex justify-end'>
          <FontAwesomeIcon
            icon={faX}
            onClick={() => toggleForm()}
            className='mb-2 relative text-green-800'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Tile Name</label>
          <input
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='tileName'
            type='text'
            placeholder='Name'
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Category</label>
          <button
            onClick={() => setIsOpen(!isOpen)}
            id='dropdownDefault'
            data-dropdown-toggle='dropdown'
            className='w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center  justify-between'
            type='button'
          >
            {categories && selectedCategory ? selectedCategory : categories[0]}
            <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
          </button>
          {isOpen && (
            <div
              id='dropdown'
              className='w-full z-10  bg-green-600 rounded-b-lg divide-y divide-gray-100 shadow'
            >
              <ul
                className='py-1 text-sm text-gray-700 dark:text-gray-200'
                aria-labelledby='dropdownDefault'
              >
                {categories &&
                  categories.map((category, index) => (
                    <li
                      key={index}
                      className='cursor-pointer mb-1 ml-1'
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <button
            onClick={handleSubmit}
            className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded'
            type='button'
          >
            Add Tile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTileForm;
