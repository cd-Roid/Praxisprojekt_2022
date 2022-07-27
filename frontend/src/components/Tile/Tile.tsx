import React from 'react';


type TileProps = {
  name: string;
  category: string;
  styles?: object;
};

const Tile: React.FC<TileProps> = ({ name, category, styles }) => {
  return (
    <div style={styles} className={`${category} flex justify-center items-center `}>
      {name}
    </div>
  );
};

export default Tile;
