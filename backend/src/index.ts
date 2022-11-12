import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

config();
const app = express();
const server = createServer(app);
app.use(cors({ origin: `localhost:${process.env.PORT}`, credentials: true }));
const port = process.env.PORT || 9000;
const io = new Server(server);

app.get("/", (req: express.Request, res: express.Response) =>
	res.send("Hello from Server" + port),
);



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

export type CursorData = {
	x: number;
	y: number;
	remoteUser: string;
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
const state: RoomData[] = [];

app.get("/state", (req, res) => {
	res.send(state);
});

io.on("connection", (socket) => {
	socket.on("room-create", (data: UserData) => {
		/**
		 * create a new room and set the user as a host
		 * add the room to the state
		 * emit the room code to the user
		 */
		state.push({
			roomId: data.roomId,
			users: [data],
			tiles: [],
		});
		socket.join(data.roomId);
		socket.emit("create-success", data);
	});

	socket.on("join-room", (data: UserData) => {
		/**
		 * check if the room exists
		 * if it does, add the user to the room
		 * update the room state
		 * emit the room data to the every user in the room
		 */
		const room = state.find((room) => room.roomId === data.roomId);
		if (room) {
			room.users.push(data);
			socket.join(data.roomId);
			socket.emit("join-success", room);
			io.to(data.roomId).emit("room-data", room);
		}
	});

	socket.on("tile-drop", (data: SocketDragTile) => {
		console.log(data);
		const room = state.find((room) => room.roomId === data.roomId);
		console.log(room);
		if (room) {
			room.tiles.push({
				tiles: {
					id: data.tile.id,
					category: data.tile.category,
					src: data.tile.src,
					x: data.tile.x,
					y: data.tile.y,
				},
			});
			io.to(data.roomId).emit("room-data", room);
		}
	});

	// state.cachedTiles.push(data.socketDragTile);
	// socket.to(data.roomId).emit("tile-drop", data.socketDragTile);

	// socket.on("tab-focus", (data: boolean) => {
	// 	console.log("tab-focus", data);
	// });

	// socket.on("tile-drag", (data: SocketDragTileData) => {
	// 	socket.broadcast.emit("tile-drag", data.socketDragTile);
	// 	state.cachedTiles.forEach((cachedTile) => {
	// 		if (cachedTile.tile.id === data.socketDragTile.tile.id) {
	// 			cachedTile.tile.x = data.socketDragTile.tile.x;
	// 			cachedTile.tile.y = data.socketDragTile.tile.y;
	// 		}
	// 	});
	// });
	// socket.on("cursor", (data: SocketCursorData) => {
	// 	socket.to(data.roomId).emit("cursor", data.cursorPos);
	// });

	// socket.on("tile-delete", (data: string) => {
	// 	socket.broadcast.emit("tile-delete", data);
	// 	state.cachedTiles = state.cachedTiles.filter(
	// 		(tile) => tile.tile.id !== data,
	// 	);
	// });

	socket.on("disconnect", () => {
		/**
		 * before updating the state check if the user is the host
		 * if the user is the host then delete the room
		 * else just remove the user from the room
		 * if the user is the only one in the room also just delete the room
		 */

		state.filter((room) => {
			room.users.filter((user) => {
				if (user.userId === socket.id) {
					if (user.isHost || room.users.length === 1) {
						state.splice(state.indexOf(room), 1);
					} else {
						room.users.splice(room.users.indexOf(user), 1);
					}
				}
			});
		});
	});

	socket.on("error", (err) => {
		console.log("A Websocket Error happened", err);
	});
});

server.listen(port, () => console.log(`Server running on port  ${port}`));
