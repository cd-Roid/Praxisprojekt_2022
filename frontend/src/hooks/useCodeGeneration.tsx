import React from 'react';
import { useConnectedTilesState } from '../state/SyntaxTreeState';
import { useBoardState } from '../state/BoardState';
import { generateAst } from '../utils/generateAst';

const allowedConnections = {
  Start: ['Objekte'],
  Objekte: ['Zustand'],
  Zustand: ['Konditionen', 'Ende'],
  Konditionen: ['Objekte'],
  End: [],
};

export const useCodeGeneration = () => {
  const { connections, ast, setAst, generatedCode, setGeneratedCode } = useConnectedTilesState(
    (state) => state,
  );
  const { tilesOnBoard } = useBoardState((state) => state);
  const generateCode = () => {
    connections.forEach((connection) => {
      const { from, to } = connection;
      const fromSplit = from.split('_');
      const toSplit = to.split('_');
      const fromTileObject = tilesOnBoard.find((tile) => tile.id === fromSplit[0]);
      const toTileObject = tilesOnBoard.find((tile) => tile.id === toSplit[0]);
      const fromTile = {
        id: fromSplit[0],
        anchorPosition: fromSplit[1],
        tileName: fromTileObject?.name,
        tileCategory: fromTileObject?.category,
        astNode: fromTileObject?.astNode,
      };
      const toTile = {
        id: toSplit[0],
        anchorPosition: toSplit[1],
        tileName: toTileObject?.name,
        tileCategory: toTileObject?.category,
        astNode: toTileObject?.astNode,
      };
      if (!fromTile.tileName || !toTile.tileName) return;
      // special Condition for Connection 2 Conditions
      if (
        fromTile.tileCategory === 'Konditionen' &&
        fromTile.tileName === 'Und' &&
        toTile.tileCategory === 'Konditionen' &&
        toTile.tileName === 'Dann'
      ) {
        generateAst(fromTile, toTile, ast, setAst, connections, generatedCode, setGeneratedCode);
      } else {
        if (
          !allowedConnections[fromTile.tileCategory as keyof typeof allowedConnections].includes(
            toTile.tileCategory as never,
          )
        ) {
          alert(
            `ungültige Verbindung: ${fromTile.tileCategory}  -> ${toTile.tileCategory}. ${
              fromTile.tileCategory
            } dürfen nur mit ${
              allowedConnections[fromTile.tileCategory as keyof typeof allowedConnections]
            } verbunden werden.`,
          );
        } else {
          generateAst(fromTile, toTile, ast, setAst, connections, generatedCode, setGeneratedCode);
        }
      }
    });
  };

  return {
    generateCode,
  };
};
