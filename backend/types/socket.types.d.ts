export type UserData = {
	roomId: string;
	userName: string;
	userId: string;
	isHost: boolean;
	cursorPos?: {
		x: number;
		y: number;
	};
};
export type SocketDeleteData = {
	roomId: string;
	id: string;
};

export type NewNode = {
	id: string;
	category: string;
	src: string;
	x: number;
	y: number;
};

export type SocketDragTile = {
	remoteUser: string;
	tile: NewNode;
	roomId: string;
};

export type SocketCursorData = {
	x: number;
	y: number;
	remoteUser: string;
	roomId: string;
};

//state object for each room
export type TileData = {
	tiles: {
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
