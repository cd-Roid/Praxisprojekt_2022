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

io.sockets.on("connection", () => console.log("Listening for connections"));

io.on("connection", (socket) => {
	console.log(`a user connected ${socket.id}`);
});

io.listen(9001);
server.listen(port, () => console.log(`Server running on port  ${port}`));
