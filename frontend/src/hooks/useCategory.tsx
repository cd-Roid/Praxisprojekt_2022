export const getTileType = (categoryName: string) => {
  switch (categoryName) {
    case 'Objects':
      return {
        points: [12, -25, -90, 25, -90, 120, 10, 165, 110, 120, 110, 25],
        text: { x: -6, y: 70 },
        fill: '#008000',
      };
    case 'Actions':
      return {
        points: [7, 49, -95, 95, 5, 145, 105, 97],
        text: { x: -6, y: 90 },
        fill: '#db5d41',
      };
    case 'Conditions':
      return {
        points: [12, -25, -90, 25, -90, 120, 12, 70, 110, 120, 110, 25],
        text: { x: -6, y: 40 },
        fill: '#bababa',
      };
    case 'Negation':
      return {
        points: [12, -25, -90, 25, -90, 120, 12, 70, 110, 120, 110, 25],
        text: { x: -6, y: 40 },
        fill: '#db5d41',
      };
    case 'Union':
      return {
        points: [12, -25, 12, 165, 110, 120, 110, 25],
        text: { x: 50, y: 70 },
        fill: '#bababa',
      };
    default:
      throw new Error('No Category Provided');
  }
};
