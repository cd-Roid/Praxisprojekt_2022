import React from 'react';
import { Stage, Layer } from 'react-konva';
import useWindowDimensions from '../../hooks/useWindowDimensions';


// Man Stage Component that holds the Canvas. Scales based on the window size.
 

const Board = () => {
  const { height, width } = useWindowDimensions();
  return (
    <>
      <Stage width={width} height={height}>
        <Layer></Layer>
      </Stage>
    </>
  );
};

export default Board;
