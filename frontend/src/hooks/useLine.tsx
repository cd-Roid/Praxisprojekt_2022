import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react';
import { Line } from 'react-konva';
import { useBoardState } from '../state/BoardState';
import { useConnectedTilesContext } from '../state/SyntaxTreeState';
import { Coordinates, Tile as TileProps } from '../types';

export const useLine = () => {
  const setConnectionPreview = useConnectedTilesContext((state) => state.setConnectionPreview);
  const tilesOnBoard = useBoardState((state) => state.tilesOnBoard);
  const hasInterSection = (position: Coordinates, tilePosition: Coordinates) => {
    return !(tilePosition.x > position.x || tilePosition.y > position.y);
  };

  const detectConnection = (position: Coordinates, id: string) => {
    const intersectingTile: TileProps | undefined = tilesOnBoard.find((tile) => {
      const tilePosition = { x: tile.x, y: tile.y };
      return id !== tile.id && hasInterSection(position, tilePosition);
    });
    if (intersectingTile) {
      console.log('intersectingTile: ', intersectingTile);
      return intersectingTile;
    }
    console.log('no interesction');
    return null;
  };

  const handleAnchorDragStart = (
    e: KonvaEventObject<DragEvent>,
    createConnectionPoints: (
      source: {
        x: number;
        y: number;
      },
      destination: {
        x: number;
        y: number;
      },
    ) => number[],
  ) => {
    const position = e.target.position();
    setConnectionPreview(
      <Line
        x={position.x}
        y={position.y}
        points={createConnectionPoints(position, position)}
        stroke='green'
        strokeWidth={4}
      />,
    );
  };

  const handleAnchorDragMove = (
    e: KonvaEventObject<DragEvent>,
    createConnectionPoints: (
      source: {
        x: number;
        y: number;
      },
      destination: {
        x: number;
        y: number;
      },
    ) => number[],
  ) => {
    const position = e.target.position();
    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();
    if (pointerPosition) {
      const mousePos = {
        x: pointerPosition.x - position.x,
        y: pointerPosition.y - position.y,
      };
      setConnectionPreview(
        <Line
          x={position.x}
          y={position.y}
          points={createConnectionPoints({ x: 0, y: 0 }, mousePos)}
          stroke='#1E7D73'
          strokeWidth={4}
        />,
      );
    }
  };

  const handleAnchorDragEnd = (
    e: KonvaEventObject<DragEvent>,
    id: string,
    connections: {
      source: string;
      destination: TileProps;
    }[],
    setConnections: React.Dispatch<
      React.SetStateAction<
        {
          source: string;
          destination: TileProps;
        }[]
      >
    >,
  ) => {
    setConnectionPreview(null);
    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();
    if (pointerPosition) {
      const intersectingTile = detectConnection(pointerPosition, id);
      if (intersectingTile !== null) {
        setConnections([...connections, { source: id, destination: intersectingTile }]);
      }
    }
  };

  return {
    detectConnection,
    handleAnchorDragStart,
    handleAnchorDragMove,
    handleAnchorDragEnd,
  };
};
