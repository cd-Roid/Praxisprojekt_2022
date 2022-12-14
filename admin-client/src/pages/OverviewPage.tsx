import React from 'react';
import Navbar from '../components/Navbar';
import json from '../json/kacheln.json';
import Tile from '../components/Tile';
import { handleClick } from '../hooks/useNavigation';
import { useNavigate } from 'react-router';

const OverviewPage = () => {
  const navigate = useNavigate();
  const [tiles, setTiles] = React.useState(json);
  React.useEffect(() => {
    setTiles(json);
  }, []);

  return (
    <div>
      <Navbar />
      <div className='flex flex-wrap pt-12 px-2 tablet:px-0'>
        {tiles.map(({ id, category, name, url }) => (
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
