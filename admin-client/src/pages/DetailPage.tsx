import React from 'react';
import Navbar from '../components/Navbar';
import { Tile as TileType } from '../types/apiTypes';
import { useParams } from 'react-router-dom';
import UploadComponent from '../components/UploadComponent';

const DetailPage = () => {
  const { id } = useParams();
  const [tile, setTile] = React.useState<TileType>();

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:9001/${id}`, {
          method: 'GET',
        });
        const data = await response.json();
        setTile(data);
      } catch (error) {
        // TODO: Error handling
        console.log('error', error);
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />
      {tile && id && (
        <UploadComponent name={tile.name} category={tile.category} url={tile.url} id={id} />
      )}
    </div>
  );
};

export default DetailPage;
