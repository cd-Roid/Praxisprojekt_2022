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
  name: string;
  category: string;
  customClass?: string;
};