export type UserData = {
  roomId: string;
  userName: string;
  userId: string;
  isHost: boolean;
  hasFocus?: boolean;
  color: string;
  cursorPos: {
    x: number;
    y: number;
  };
};


export type NewTile = {
  category: string;
  src: string;
  name: string;
  points: number[];
  color: string;
  textPosition: { x: number; y: number };
};

export type CursorData = {
  x: number;
  y: number;
  remoteUser: string;
};

export type Tile = {
  x: number;
  y: number;
  _id?: string;
  id: string;
  src: string;
  name: string;
  color: string;
  points: number[];
  category: string;
  textPosition: { x: number; y: number };
};

export type InnerObject = {
  category: string;
  name: string;
  svgPath: string;
  fill: string;
  svgRotate: number;
  src: string;
};

export type SocketDragTile = {
  remoteUser: string;
  tile: Tile;
  roomId: string;
  remoteUserColor: string;
};

export type TileData = {
  tile: Tile;
};

export type RoomData = {
  roomId: string;
  users: UserData[];
  tiles?: TileData[];
};