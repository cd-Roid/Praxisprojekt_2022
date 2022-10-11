import { Line } from 'react-konva';
import React, { useEffect } from 'react';
import { Stage as StageType } from 'konva/lib/Stage';
import { Layer as LayerType } from 'konva/lib/Layer';
import useWindowDimensions from './useWindowDimensions';

type gridProps = {
  stageRef: React.RefObject<StageType>;
  gridLayer: React.RefObject<LayerType>;
};
export const useGrid = ({ stageRef, gridLayer }: gridProps) => {
  // Component that renders the grid

  const [gridComponents, setGridComponents] = React.useState<JSX.Element[]>([]);
  const { height, width } = useWindowDimensions();
  const unScale = (height: number) => {
    let scale = 0;
    if (stageRef.current) {
      scale = stageRef.current.scaleX();
    }
    return height / scale;
  };

  useEffect(() => {
    if (stageRef.current && gridLayer.current) {
      const gridLines = [];
      const stageRect = {
        x1: 0,
        y1: 0,
        x2: stageRef.current.width(),
        y2: stageRef.current.height(),
        offset: {
          x: unScale(stageRef.current.position().x) || 0,
          y: unScale(stageRef.current.position().y) || 0,
        },
      };
      // make a rect to describe the viewport
      const viewRect = {
        x1: -stageRect.offset.x,
        y1: -stageRect.offset.y,
        x2: width && unScale(width) - stageRect.offset.x,
        y2: height && unScale(height) - stageRect.offset.y,
      };
      // and find the largest rectangle that bounds both the stage and view rect.
      // This is the rect we will draw on.
      let fullRect = {
        x1: Math.min(stageRect.x1, viewRect.x1),
        y1: Math.min(stageRect.y1, viewRect.y1),
        x2: Math.max(stageRect.x2, viewRect.x2),
        y2: Math.max(stageRect.y2, viewRect.y2),
      };
      const stepSize = 100; // set a value for the grid step gap.
      // set clip function to stop leaking lines into non-viewable space.
      gridLayer.current.clip({
        x: viewRect.x1,
        y: viewRect.y1,
        width: viewRect.x2 - viewRect.x1,
        height: viewRect.y2 - viewRect.y1,
      });
      const gridOffset = {
        x: Math.ceil(unScale(stageRef.current.position().x) / stepSize) * stepSize,
        y: Math.ceil(unScale(stageRef.current.position().y) / stepSize) * stepSize,
      };
      const gridRect = {
        x1: -gridOffset.x,
        y1: -gridOffset.y,
        x2: unScale(width) - gridOffset.x + stepSize,
        y2: unScale(height) - gridOffset.y + stepSize,
      };
      const gridFullRect = {
        x1: Math.min(stageRect.x1, gridRect.x1),
        y1: Math.min(stageRect.y1, gridRect.y1),
        x2: Math.max(stageRect.x2, gridRect.x2),
        y2: Math.max(stageRect.y2, gridRect.y2),
      };
      fullRect = gridFullRect;

      const // find the x & y size of the grid
        xSize = fullRect.x2 - fullRect.x1,
        ySize = fullRect.y2 - fullRect.y1,
        // compute the number of steps required on each axis.
        xSteps = Math.round(xSize / stepSize),
        ySteps = Math.round(ySize / stepSize);

      // draw vertical lines
      for (let i = 0; i <= xSteps; i++) {
        gridLines.push(
          <Line
            key={`vline-${i}`}
            points={[
              fullRect.x1 + i * stepSize,
              fullRect.y1,
              fullRect.x1 + i * stepSize,
              fullRect.y2,
            ]}
            stroke='black'
            strokeWidth={1}
          />,
        );
      }
      // draw Horizontal lines
      for (let i = 0; i <= ySteps; i++) {
        gridLines.push(
          <Line
            key={`hline-${i}`}
            points={[
              fullRect.x1,
              fullRect.y1 + i * stepSize,
              fullRect.x2,
              fullRect.y1 + i * stepSize,
            ]}
            stroke='black'
            strokeWidth={1}
          />,
        );
      }
      setGridComponents(gridLines);
    }
  }, [stageRef.current?.scale()]);

  return { gridComponents };
};
