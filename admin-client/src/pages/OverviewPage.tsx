import React from 'react';
import Navbar from '../components/Navbar';
import Tile from '../components/Tile';
import { handleClick } from '../hooks/useNavigation';
import { useNavigate } from 'react-router';
import { useToast } from '../hooks/useToast';

const OverviewPage = () => {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [tiles, setTiles] = React.useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${backendUrl}`, {
          method: 'GET',
        });
        const data = await response.json();
        setTiles(data);
      } catch (error) {
        notify('error', 'An errror occured, please try again later');
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='flex flex-wrap pt-12 px-2 tablet:px-0'>
        {tiles.map(({ _id: id, category, name, url }) => (
          <Tile
            category={category}
            name={name}
            url={url}
            key={id}
            onClickFunc={() => handleClick(id, navigate)}
          />
        ))}
      </div>
    </div>
  );
};

export default OverviewPage;
