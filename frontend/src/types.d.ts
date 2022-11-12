export type UserData = {
  roomId: string;
  userName: string;
  userId: string;
  isHost: boolean;
  hasFocus?: boolean;
  cursorPos: {
    x: number;
    y: number;
  };
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
  src: string;
  id: string;
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

export type TileData = {
  tile: {
    id: string;
    category: string;
    src: string;
    x: number;
    y: number;
  };
};

export type RoomData = {
  roomId: string;
  users: UserData[];
  tiles?: TileData[];
};
