export const getTileType = (categoryName: string) => {
  switch (categoryName) {
    case 'Objects':
      return {
        // points for a top pointed hexagon
        points: [0, -100, 100, -50, 100, 50, 0, 100, -100, 50, -100, -50],
        text: { x: -22, y: 0 },
        fill: '#008000',
      };
    case 'Actions':
      return {
        points: [0, -50, -100, 0, 0, 50, 100, 0],
        text: { x: -25, y: -5 },
        fill: '#db5d41',
      };
    case 'Conditions':
      return {
        points: [0, -50, -100, 0, -100, 100, 0, 50, 100, 100, 100, 0],
        text: { x: -25, y: 0 },
        fill: '#bababa',
      };
    case 'Negation':
      return {
        points: [0, -50, -100, 0, -100, 100, 0, 50, 100, 100, 100, 0],
        text: { x: -25, y: 0 },
        fill: '#db5d41',
      };
    case 'Union':
      return {
        points: [-50, -100, -50, 100, 50, 50, 50, -50],
        text: { x: -20, y: 0 },
        fill: '#bababa',
      };
    default:
      throw new Error('No Category Provided');
  }
};
