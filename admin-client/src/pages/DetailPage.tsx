import React from 'react';
import Navbar from '../components/Navbar';
import { Tile as TileType } from '../types/apiTypes';
import { useParams } from 'react-router-dom';
import UploadComponent from '../components/UploadComponent';

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
      {tile && (
        <UploadComponent name={tile.name} category={tile.category} url={tile.url} id={tile.id} />
      )}
    </div>
  );
};

export default DetailPage;
