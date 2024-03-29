import MenuTile from '../Tiles/MenuTile';
import { InnerObject } from '../../types';
import { useMouse } from '../../hooks/useMouse';
import React, { useEffect, useState } from 'react';
import { useBoardState } from '../../state/BoardState';

type CategoryProps = {
  category: string;
};


const Category: React.FC<CategoryProps> = ({ category }) => {
  const [stateItems, setStateItems] = useState<InnerObject[]>([]);
  const allTiles = useBoardState((state) => state.allTiles);
  const { handleDragStart } = useMouse();

  useEffect(() => {
    const InnerObjectArray: InnerObject[] = [];
    allTiles.forEach((object) => {
      object.category === category && InnerObjectArray.push(object);
    });
    setStateItems(InnerObjectArray);
  }, [allTiles]);

  return (
    <div>
      {stateItems &&
        stateItems.map((tile, index: number) => (
          <MenuTile {...tile} dragFunction={handleDragStart} key={index} />
        ))}
    </div>
  );
};

export default Category;
