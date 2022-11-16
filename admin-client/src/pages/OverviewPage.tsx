import React from 'react';
import Navbar from '../components/Navbar';
import json from '../json/kacheln.json';
import Tile from '../components/Tile';

const OverviewPage = () => {
  const [tiles, setTiles] = React.useState(json);

  React.useEffect(() => {
    setTiles(json);
  }, []);

  return (
    <div>
      <Navbar />
      <div className='flex flex-wrap pt-12'>
        {tiles.map(({ name, category, url }, index) => (
          <Tile category={category} name={name} file={url} key={index} />
        ))}
      </div>
    </div>
  );
};

export default OverviewPage;
