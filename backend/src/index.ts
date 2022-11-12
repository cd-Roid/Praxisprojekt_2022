import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import {
	RoomData,
	SocketCursorData,
	SocketDeleteData,
	SocketDragTile,
	UserData,
} from "../types/socket.types";

config();
const app = express();
const server = createServer(app);
app.use(cors({ origin: `localhost:${process.env.PORT}`, credentials: true }));
const port = process.env.PORT || 9000;
const io = new Server(server);

app.get("/", (req: express.Request, res: express.Response) =>
	res.send("Hello from Server" + port),
);

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
		/**
		 * check if the room exists
		 * if it does, add the tile to the room
		 * update the room state
		 * emit the room data to the every user in the room
		 */
		const room = state.find((room) => room.roomId === data.roomId);
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

	// socket.on("tab-focus", (data: boolean) => {
	// 	console.log("tab-focus", data);
	// });

	socket.on("tile-drag", (data: SocketDragTile) => {
		/**
		 * check if the room exists
		 * if it does, check if the tile exists
		 * if it does, update the tile position
		 * update the room state
		 * emit the room data to the every user in the room
		 */

		const room = state.find((room) => room.roomId === data.roomId);
		if (room) {
			const tile = room.tiles.find((tile) => tile.tiles.id === data.tile.id);
			if (tile) {
				tile.tiles.x = data.tile.x;
				tile.tiles.y = data.tile.y;
				io.to(data.roomId).emit("room-data", room);
			}
		}
	});

	socket.on("cursor", (data: SocketCursorData) => {
		/**
		 * check if the room exists
		 * if it does, check if the user exists
		 * if it does, update the user cursor position
		 * update the room state
		 * emit the room data to the every user in the room
		 */
		const room = state.find((room) => room.roomId === data.roomId);
		if (room) {
			const user = room.users.find((user) => user.userId === data.remoteUser);
			if (user) {
				user.cursorPos = {
					x: data.x,
					y: data.y,
				};
				io.to(data.roomId).emit("room-data", room);
			}
		}
	});

	socket.on("tile-delete", (data: SocketDeleteData) => {
		/**
		 * check if the room exists
		 * if it does,then check if the tile exists
		 * if it does, delete the tile from the room
		 * update the room state
		 * emit the room data to the every user in the room
		 */

		const room = state.find((room) => room.roomId === data.roomId);
		if (room) {
			room.tiles = room.tiles.filter((tile) => tile.tiles.id !== data.id);
			io.to(data.roomId).emit("room-data", room);
		}
	});

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
