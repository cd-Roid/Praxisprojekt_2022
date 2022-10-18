import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const server = express();
server.use(cors({ origin: "localhost:9001", credentials: true }));
const port = 9000;
const io = new Server();

server.get("/", (req: express.Request, res: express.Response) =>
	res.send("Hello from Server" + port),
);



io.on("connection", (socket) => {
	console.log(`a user connected ${socket.id}`);
	socket.on("new", (data) => {
		io.emit("new", data, () => console.log("Resent event"));
		console.log(data);
	});
	socket.on("tile-drop", (data) => {
		io.emit("tile-drop", data);
		console.log("tile-drop", data);
	});
	socket.on("tile-drag", (data) => {
		io.emit("tile-drag", data);
		console.log("tile-drag", data);
	});
	socket.on("cursor", (data) => {
		io.emit("cursor", data);
		console.log(data);
	});
	
	socket.on("disconnect", () => {
		console.log(`${socket.id} disconnected`);
	});
});

io.listen(9001);
server.listen(port, () => console.log(`Server running on port  ${port}`));
