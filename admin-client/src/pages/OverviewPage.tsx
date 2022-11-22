import React from 'react';
import Navbar from '../components/Navbar';
import json from '../json/kacheln.json';
import Tile from '../components/Tile';
import { useNavigate, NavigateFunction } from 'react-router-dom';
const OverviewPage = () => {
  const navigate = useNavigate();
  const [tiles, setTiles] = React.useState(json);
  React.useEffect(() => {
    setTiles(json);
  }, []);

  const handleClick = (id: string, navigatorFunc: NavigateFunction) => {
    navigatorFunc(`/${id}`);
  };

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
