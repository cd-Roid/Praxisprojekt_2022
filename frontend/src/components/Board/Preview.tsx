import React, { useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { Layer as LayerType } from 'konva/lib/Layer';
import { Stage as StageType } from 'konva/lib/Stage';
type Props = {
  stageRef: React.RefObject<StageType>;
  layerRef: React.RefObject<LayerType>;
};

const Preview = ({ layerRef, stageRef }: Props) => {
  // preview of the board
  const previewStage = React.useRef<StageType>(null);

  useEffect(() => {
    const clone = layerRef.current?.clone({ listening: false });
    if (clone && stageRef.current) {
      previewStage.current?.destroyChildren();
      previewStage.current?.add(clone);
    }
  }, [stageRef.current?.getRelativePointerPosition(), stageRef.current?.scale()]);

  return (
    <div>
      {stageRef.current && (
        <div
          className={`border-4 border-black w-[${stageRef.current?.width() / 8}] h-[${
            stageRef.current?.height() / 8
          }] absolute right-0 bg-green-100`}
        >
          <Stage
            ref={previewStage}
            width={stageRef.current?.width() / 8}
            height={stageRef.current?.height() / 8}
            scaleX={stageRef.current?.scaleX() / 8}
            scaleY={stageRef.current?.scaleY() / 8}
          >
            <Layer></Layer>
          </Stage>
        </div>
      )}
    </div>
  );
};

export default Preview;
