// currently not used

type TileTypeProps = {
  points: number[];
  textPosition: { x: number; y: number };
  fill: string;
  rotation: number;
  svgPath: string;
};

export const getTileType = (categoryName: string): TileTypeProps => {
  switch (categoryName) {
    case 'Start':
      return {
        points: [0, -100, 100, -50, 0, 0, 0, 100, -90, 50],
        textPosition: { x: -60, y: 30 },
        fill: '#f9b43d',
        rotation: -60,
        svgPath: 'M1 186L89 237V117L194 57L97 1L1 186Z',
      };
    case 'End':
      return {
        points: [-200, -50, 0, -50, 0, 50, -200, 50, -100, 0],
        textPosition: { x: -125, y: -5 },
        fill: '#f9b43d',
        rotation: 0,
        svgPath: 'M193.5 1H2L105 66.5L2 131.5H193.5V1Z',
      };
    case 'Objects':
      return {
        // points for a top pointed hexagon
        points: [0, -100, 100, -50, 100, 50, 0, 100, -100, 50, -100, -50],
        textPosition: { x: -60, y: 0 },
        fill: '#eb555b',
        rotation: 0,
        svgPath: 'M104 0L207.923 60V180L104 240L0.0769501 180V60L104 0Z',
      };
    case 'Actions':
      return {
        points: [0, -50, -100, 0, 0, 50, 100, 0],
        textPosition: { x: -60, y: -5 },
        fill: '#f4aece',
        rotation: 0,
        svgPath: 'M103 0L206 66.5L103 131L0 66.5L103 0Z',
      };
    case 'Conditions':
      return {
        points: [0, -50, -100, 0, -100, 100, 0, 50, 100, 100, 100, 0],
        textPosition: { x: -60, y: 0 },
        fill: '#bababa',
        rotation: 0,
        svgPath: 'M105 0L208 60V149L105 85L0 149V60L105 0Z',
      };
    case 'Negation':
      return {
        points: [0, -50, -100, 0, -100, 100, 0, 50, 100, 100, 100, 0],
        textPosition: { x: -60, y: 0 },
        fill: '#eb555b',
        rotation: 0,
        svgPath: 'M105 0L208 60V149L105 85L0 149V60L105 0Z',
      };
    case 'Union':
      return {
        points: [-50, -100, -50, 100, 50, 50, 50, -50],
        textPosition: { x: -55, y: 0 },
        fill: '#bababa',
        rotation: 0,
        svgPath: 'M0 0L102.5 66.5V181L0 246.5V0Z',
      };
    default:
      throw new Error('No Category Provided');
  }
};
