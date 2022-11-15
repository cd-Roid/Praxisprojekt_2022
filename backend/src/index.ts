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
import { setConfig } from "./Config/db";
import mongoose from "mongoose";
import router from "./Routes/ApiRoutes";
const path = require("path");

config();
const app = express();
const dbConfig = setConfig(
	process.env.DB_URL,
	process.env.DB_NAME,
	process.env.DB_BUCKET,
);

const port = process.env.PORT || 9000;
const server = createServer(app);
const io = new Server(server);
mongoose.connect(dbConfig.url + dbConfig.database);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.on("open", () => console.log("Database connected"));

app.use(router);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors({ origin: `localhost:${process.env.PORT}`, credentials: true }));
app.use(express.urlencoded({ extended: true }));



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
