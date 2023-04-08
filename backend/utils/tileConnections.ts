import { TileConnection } from "./../types/socket.types";

const splitIds = (id: string) => {
	const [fromId, toId] = id.split(".");
	return { fromId, toId };
};

const findConnections = (value: string, connections: TileConnection[]) => {
	const { fromId, toId } = splitIds(value);
	console.log(fromId, toId);
	return connections.filter(
		(connection) => connection.from !== fromId && connection.to !== toId,
	);
};

export { splitIds, findConnections };
