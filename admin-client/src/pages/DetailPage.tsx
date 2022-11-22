import React from 'react';
import Navbar from '../components/Navbar';
import { Tile as TileType } from '../types/apiTypes';
import { useParams } from 'react-router-dom';
import Upload from '../components/Upload';
import Input from '../components/Input';
import Button from '../components/Button';
const DetailPage = () => {
  const { id } = useParams();
  const [tile, setTile] = React.useState<TileType>();

  React.useEffect(() => {
    const data = {
      id: '1',
      category: 'Objects',
      name: 'Lampe',
      url: 'https://i.ibb.co/8M0jgv1/When.png',
    };
    setTile(data);
  }, []);

  return (
    <div>
      <Navbar />
      <div className='w-full h-auto mx-auto flex justify-center align-middle'>
        <div className='w-full mx-6 my-16 tablet:border border-black max-w-4xl '>
          <div className='tablet:w-full tablet:flex tablet:flex-row tablet:justify-around '>
            <div className='my-12 mx-6 flex flex-col justify-center align-middle'>
              {tile?.url !== undefined && <Upload backgroundUrl={tile.url} />}
              <div className='mt-3 flex flex-col'>
                {tile?.name !== undefined && <Input label='Name' placeHolder={tile.name} />}
                {tile?.name !== undefined && <Input label='Category' placeHolder={tile.category} />}
              </div>
            </div>
            <div className='hidden tablet:block'>
              <div className='border border-black min-w-fit h-fit flex justify-center align-middle max-w-sm my-12'>
                <img className='p-8' src={tile?.url} />
              </div>
            </div>
          </div>
          <div className='mx-10 flex flex-col justify-center align-middle tablet:justify-end tablet:mx-20 tablet:mb-6'>
            <Button buttonText='Update' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
