import { Group } from 'react-konva';
export type NewNode = {
  id: string;
  category: string;
  name: string;
  x: number;
  y: number;
};

export type CursorData = {
  x: number;
  y: number;
};

export type Tile = {
  uid: string;
  x: number;
  y: number;
  name: string;
  category: string;
  ref: React.RefObject<Group>;
};

export type MenuTileProps = {
  name: string;
  category: string;
};

export type InnerObject = {
  category: string;
  name: string;
};
