import React from 'react';
import Navbar from '../components/Navbar';
import { Tile as TileType } from '../types/apiTypes';
import { useParams } from 'react-router-dom';
const DetailPage = () => {
  const { id } = useParams();
  const [tile, setTile] = React.useState<TileType>();

  React.useEffect(() => {
    const data = {
      id: '1',
      category: 'category',
      name: 'Start',
      url: 'https://i.ibb.co/8M0jgv1/When.png',
    };
    setTile(data);
  }, []);

  return (
    <div className='h-screen'>
      <Navbar />
      <div className='h-full grid grid-cols-1 grid-rows-4 overflow-hidden tablet:grid-cols-4 tablet:grid-rows-1'>
        <aside className='box row-start-1 row-span-2  tablet:row-span-full tablet:col-start-1 tablet:col-span-1 bg-gray-500'>
          <div className='h-full flex tablet:hidden justify-center items-center'>
            <div className=' w-4/5 h-4/5 bg-red-500 '> Upload Field</div>
          </div>

          <div className='h-2/3 hidden tablet:flex mt-20 bg-grey'>
            {tile && (
              <div>
                <img className='p-4' src={tile.url} />
                <h3 className='text-xl font-bold p-2'>{tile.name}</h3>
                <p className='text-sm px-2'>{tile.category}</p>
              </div>
            )}
          </div>
        </aside>
        <div className='box row-start-3 row-span-4 tablet:row-span-full tablet:col-start-2 tablet:col-span-3  bg-gray-700'>
          <div className='h-full flex tablet:hidden justify-center items-center'>
            <div className=' w-4/5 h-4/5 bg-red-500 '>
              {tile && (
                <div>
                  <img className='h-2/5 w-2/5 px-2 pb-6' src={tile.url} />
                  <h3 className='text-xl font-bold px-2 py-4'>{tile.name}</h3>
                  <p className='text-sm px-2'>{tile.category}</p>
                </div>
              )}
            </div>
          </div>
          <div className='flex-col w-full h-full p-20'>
            <div className='h-full hidden tablet:flex justify-center items-start '>
              <div className=' w-4/5 h-4/5 bg-red-500 '> Content Field</div>
            </div>
            <div className='hidden tablet:flex justify-end items-start bg-gray-300'>
              <div className='w-1/5 flex justify-around'>
                <div className='w-12 h-8 bg-gray-800'></div>
                <div className='w-12 h-8 bg-gray-800'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
