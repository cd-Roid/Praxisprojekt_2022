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
import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import { setConfig } from "./Config/db";
import router from "./Routes/ApiRoutes";
import { state } from "./Model/Sockets/SocketState";
import whiteList from "./Config/originWhitelist";

/**
 * Start of the application
 * sets up the database config from the .env file
 * sets up the express server
 * sets up the socket.io server
 * sets up the routes
 * sets up the database connection
 * uses the socket Controllers to handle the socket events
 */

config();
const app = express();
const dbConfig = setConfig(process.env.DB_URL, process.env.DB_NAME);

const port = process.env.PORT || 9000;
const server = createServer(app);
const io = new Server(server);
const db = mongoose.connection;
mongoose.connect(dbConfig.url + dbConfig.database);


app.use((req, res, next) => {
	const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}
	//res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
	res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Credentials", "true");
	return next();
});
app.use(router);
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
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

db.on("error", (error) => console.error(error));
db.on("open", () => console.log("Database connected"));
server.listen(port, () => console.log(`Server running on port  ${port}`));
