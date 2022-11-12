export type UserData = {
  roomCode: string;
  userName: string;
  userId: string;
};

export type NewNode = {
  id: string;
  category: string;
  x: number;
  y: number;
  src: string;
};

export type CursorData = {
  x: number;
  y: number;
  remoteUser: string;
};

export type Tile = {
  url: string;
  uid: string;
  x: number;
  y: number;
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
  roomId: string;
};
