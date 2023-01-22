export type UserData = {
	roomId: string;
	userName: string;
	userId: string;
	isHost: boolean;
	hasFocus: boolean;
	color: string;
	cursorPos?: {
		x: number;
		y: number;
	};
};
export type SocketDeleteData = {
	roomId: string;
	id: string;
};

export type NewTile = {
	id: string;
	category: string;
	src: string;
	x: number;
	y: number;
	name: string;
	points: number[];
	color: string;
	textPosition: { x: number; y: number };
};

export type TabFocusData = {
	roomId: string;
	userId: string;
	hasFocus: boolean;
};

export type SocketDragTile = {
	remoteUser: string;
	tile: NewTile;
	roomId: string;
	remoteUserColor: string;
};

export type SocketCursorData = {
	x: number;
	y: number;
	remoteUser: string;
	roomId: string;
};

//state object for each room
export type TileData = {
	tile: NewTile;
};

export type RoomData = {
	roomId: string;
	users: UserData[];
	tiles?: TileData[];
};
