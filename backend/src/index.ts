import express from "express";
import { Server } from "socket.io";

const server = express();
const port = 9000;
const io = new Server(9001);

server.get("/", (req: express.Request, res: express.Response) =>
	res.send("Hello from Server" + port),
);

io.sockets.on("connection", () => console.log("Listening for connections"));

io.on("connection", (socket) => {
	console.log(`a user connected ${socket.data}`);
});

server.listen(port, () => console.log(`Server running on port  ${port}`));
