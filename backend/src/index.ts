import {
	UserData,
	SocketDragTile,
	SocketCursorData,
	SocketDeleteData,
	TabFocusData,
} from "./../types/socket.types.d";
import {
	createRoom,
	cursorMove,
	joinRoom,
	tabFocus,
	tileDrag,
	tileDrop,
	deleteTile,
	disconnect,
	errorHandling,
} from "./Controller/Socket/SocketControllers";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { state } from "./Model/Sockets/SocketState";

config();
const app = express();
const server = createServer(app);
app.use(cors({ origin: `localhost:${process.env.PORT}`, credentials: true }));
const port = process.env.PORT || 9000;
const io = new Server(server);

app.get("/", (req: express.Request, res: express.Response) =>
	res.send("Hello from Server" + port),
);

app.get("/state", (req, res) => {
	res.send(state);
});

io.on("connection", (socket) => {
	socket.on("room-create", (data: UserData) => createRoom(data, state, socket));
	socket.on("join-room", (data: UserData) => joinRoom(data, state, socket, io));
	socket.on("tile-drop", (data: SocketDragTile) => tileDrop(state, data, io));
	socket.on("tab-focus", (data: TabFocusData) => tabFocus(data, state, io));
	socket.on("tile-drag", (data: SocketDragTile) => tileDrag(data, state, io));
	socket.on("cursor", (data: SocketCursorData) => cursorMove(data, state, io));
	socket.on("tile-delete", (data: SocketDeleteData) =>
		deleteTile(data, state, io),
	);
	socket.on("disconnect", () => disconnect(state, socket));
	socket.on("error", (err: Error) => errorHandling(err));
});

server.listen(port, () => console.log(`Server running on port  ${port}`));
