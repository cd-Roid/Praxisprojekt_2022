export const getTileType = (categoryName: string) => {
  switch (categoryName) {
    case 'Start':
      return {
        points: [0, -100, 100, -50, 0, 0, 0, 100, -90, 50],
        text: { x: -60, y: 30 },
        fill: '#6ab22d',
        rotation: -60,
      };
    case 'End':
      return {
        points: [-200, -50, 0, -50, 0, 50, -200, 50, -100, 0],
        text: { x: -125, y: -5 },
        fill: '#db5d41',
        rotation: 0,
      };
    case 'Objects':
      return {
        // points for a top pointed hexagon
        points: [0, -100, 100, -50, 100, 50, 0, 100, -100, 50, -100, -50],
        text: { x: -60, y: 0 },
        fill: '#4ab22d',
        rotation: 0,
      };
    case 'Actions':
      return {
        points: [0, -50, -100, 0, 0, 50, 100, 0],
        text: { x: -60, y: -5 },
        fill: '#db5d41',
        rotation: 0,
      };
    case 'Conditions':
      return {
        points: [0, -50, -100, 0, -100, 100, 0, 50, 100, 100, 100, 0],
        text: { x: -60, y: 0 },
        fill: '#bababa',
        rotation: 0,
      };
    case 'Negation':
      return {
        points: [0, -50, -100, 0, -100, 100, 0, 50, 100, 100, 100, 0],
        text: { x: -60, y: 0 },
        fill: '#db5d41',
        rotation: 0,
      };
    case 'Union':
      return {
        points: [-50, -100, -50, 100, 50, 50, 50, -50],
        text: { x: -55, y: 0 },
        fill: '#bababa',
        rotation: 0,
      };
    default:
      throw new Error('No Category Provided');
  }
};
