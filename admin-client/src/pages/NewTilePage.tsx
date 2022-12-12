import React from 'react';
import Navbar from '../components/Navbar';
import UploadComponent from '../components/UploadComponent';

const NewTilePage = () => {
  return (
    <div>
      <Navbar />
      {tile && (
        <UploadComponent name={tile.name} category={tile.category} url={tile.url} id={tile.id} />
      )}
    </div>
  );
};

export default NewTilePage;
