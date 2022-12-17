import { Socket, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import {
	RoomData,
	SocketCursorData,
	SocketDeleteData,
	SocketDragTile,
	TabFocusData,
	UserData,
} from "../../../types/socket.types";

export const errorHandling = (err: Error) =>
	console.log("A Websocket Error happened", err);

export const createRoom = (
	data: UserData,
	state: RoomData[],
	socket: Socket<DefaultEventsMap, any>,
) => {
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
};

export const joinRoom = (
	data: UserData,
	state: RoomData[],
	socket: Socket<DefaultEventsMap, any>,
	io: Server<DefaultEventsMap, any>,
) => {
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
		io.to(data.roomId).emit(
			"new-user",
			`${data.userName} has joined the room!`,
		);
	} else {
		socket.emit("join-failure", "Room does not exist");
	}
};

export const tileDrop = (
	state: RoomData[],
	data: SocketDragTile,
	io: Server<DefaultEventsMap, any>,
) => {
	/**
	 * check if the room exists
	 * if it does, add the tile to the room
	 * update the room state
	 * emit the room data to the every user in the room
	 */
	const room = state.find((room) => room.roomId === data.roomId);
	if (room) {
		room.tiles.push({
			tile: {
				id: data.tile.id,
				category: data.tile.category,
				src: data.tile.src,
				x: data.tile.x,
				y: data.tile.y,
			},
		});
		io.to(data.roomId).emit("room-data", room);
	}
};

export const tabFocus = (
	data: TabFocusData,
	state: RoomData[],
	io: Server<DefaultEventsMap, any>,
) => {
	/**
	 * check if the room exists
	 * if it does, update the room state
	 * emit the room data to the every user in the room
	 */
	const room = state.find((room) => room.roomId === data.roomId);
	if (room) {
		room.users.forEach((user) => {
			if (user.userId === data.userId) {
				user.hasFocus = data.hasFocus;
			}
		});
		io.to(data.roomId).emit("room-data", room);
	}
};

export const tileDrag = (
	data: SocketDragTile,
	state: RoomData[],
	io: Server<DefaultEventsMap, any>,
) => {
	/**
	 * check if the room exists
	 * if it does, check if the tile exists
	 * if it does, update the tile position
	 * update the room state
	 * emit the room data to the every user in the room
	 */

	const room = state.find((room) => room.roomId === data.roomId);
	if (room) {
		const tile = room.tiles.find((tile) => tile.tile.id === data.tile.id);
		if (tile) {
			tile.tile.x = data.tile.x;
			tile.tile.y = data.tile.y;
			io.to(data.roomId).emit("room-data", room);
		}
	}
};

export const cursorMove = (
	data: SocketCursorData,
	state: RoomData[],
	io: Server<DefaultEventsMap, any>,
) => {
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
};

export const deleteTile = (
	data: SocketDeleteData,
	state: RoomData[],
	io: Server<DefaultEventsMap, any>,
) => {
	/**
	 * check if the room exists
	 * if it does,then check if the tile exists
	 * if it does, delete the tile from the room
	 * update the room state
	 * emit the room data to the every user in the room
	 */

	const room = state.find((room) => room.roomId === data.roomId);
	if (room) {
		room.tiles = room.tiles.filter((tile) => tile.tile.id !== data.id);
		io.to(data.roomId).emit("room-data", room);
	}
};

export const disconnect = (
	state: RoomData[],
	socket: Socket<DefaultEventsMap, any>,
) => {
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
};
