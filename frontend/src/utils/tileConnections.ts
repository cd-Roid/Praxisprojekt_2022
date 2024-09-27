const splitIds = (id: string) => {
  const [fromId, toId] = id.split('.');
  return { fromId, toId };
};

const findConnections = (value: string, connections: { from: string; to: string }[]) => {
  const { fromId, toId } = splitIds(value);
  return connections.filter((connection) => connection.from !== fromId && connection.to !== toId);
};

export { splitIds, findConnections };
