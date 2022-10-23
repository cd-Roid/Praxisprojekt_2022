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

export type CursorData = {
	x: number;
	y: number;
	remoteUser: string;
};

export type NewNode = {
	id: string;
	category: string;
	name: string;
	x: number;
	y: number;
};

export type SocketDragTile = {
	remoteUser: string;
	tile: NewNode;
};

const state = {
	cachedTiles: [] as SocketDragTile[],
	users: [] as string[],
};

app.get("/state", (req, res) => {
	res.send(JSON.stringify(state));
});

io.on("connection", (socket) => {
	state.users.push(socket.id);
	console.log(`a user connected ${socket.id}, users: ${state.users.length} `);
	if (state.cachedTiles.length > 0) {
		socket.emit("board-content", state.cachedTiles);
	}
	socket.on("tab-focus", (data: boolean) => {
		console.log("tab-focus", data);
	});

	socket.on("tile-drop", (data: SocketDragTile) => {
		state.cachedTiles.push(data);
		socket.broadcast.emit("tile-drop", data);
	});
	socket.on("tile-drag", (data: SocketDragTile) => {
		socket.broadcast.emit("tile-drag", data);
		state.cachedTiles.forEach((cachedTile) => {
			if (cachedTile.tile.id === data.tile.id) {
				cachedTile.tile.x = data.tile.x;
				cachedTile.tile.y = data.tile.y;
			}
		});
	});
	socket.on("cursor", (data: CursorData) => {
		socket.broadcast.emit("cursor", data);
	});

	socket.on("tile-delete", (data: string) => {
		socket.broadcast.emit("tile-delete", data);
		state.cachedTiles = state.cachedTiles.filter(
			(tile) => tile.tile.id !== data,
		);
	});

	socket.on("disconnect", () => {
		state.users = state.users.filter((user) => user !== socket.id);
		if (state.users.length === 0) {
			console.log("cleared logs");
			state.cachedTiles = [];
			state.users = [];
		}
		console.log(`${socket.id} disconnected, users: ${state.users.length}`);
	});

	socket.on("error", (err) => {
		console.log("A Websocket Error happened", err);
	});
});

server.listen(port, () => console.log(`Server running on port  ${port}`));
