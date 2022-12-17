import React from 'react';
import Navbar from '../components/Navbar';
import { Tile as TileType } from '../types/apiTypes';
import { useParams } from 'react-router-dom';
import UploadComponent from '../components/UploadComponent';
import { useToast } from '../hooks/useToast';

const DetailPage = () => {
  const { id } = useParams();
  const { notify } = useToast();
  const [tile, setTile] = React.useState<TileType>();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${backendUrl}/${id}`, {
          method: 'GET',
        });
        const data = await response.json();
        setTile(data);
      } catch (error) {
        notify('error', 'An errror occured, please try again later');
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
