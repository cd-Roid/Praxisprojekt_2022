export type NewNode = {
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
  x: number;
  y: number;
  name: string;
  category: string;
};

export type MenuTileProps = {
  name: string;
  category: string;
};