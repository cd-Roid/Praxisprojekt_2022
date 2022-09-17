/* eslint-disable @typescript-eslint/no-empty-function */
import { NewNode } from '../types';
import { createContext, Dispatch, SetStateAction } from 'react';
import { Stage } from 'konva/lib/Stage';

export type BoardContextType = {
  tilesOnBoard: NewNode[];
  updateBoard: Dispatch<SetStateAction<NewNode[]>>;
  stageReference: React.RefObject<Stage>;
};

export const BoardContext = createContext<BoardContextType>({
  tilesOnBoard: [],
  updateBoard: () => {},
  stageReference: { current: null },
});
