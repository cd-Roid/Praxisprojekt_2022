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
  remoteUser: string;
};

export type Tile = {
  uid: string;
  x: number;
  y: number;
  name: string;
  category: string;
};

export type MenuTileProps = {
  name: string;
  category: string;
  svgPath: string;
  fill: string;
  svgRotate: number;
  url: string;
};

export type InnerObject = {
  category: string;
  name: string;
  svgPath: string;
  fill: string;
  svgRotate: number;
  url: string;
};

export type SocketDragTile = {
  remoteUser: string;
  tile: NewNode;
};