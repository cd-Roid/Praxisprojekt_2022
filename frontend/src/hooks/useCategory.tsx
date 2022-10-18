import when from '../assets/when.svg';
import end from '../assets/end.svg';
import actions from '../assets/actions.svg';
import and from '../assets/and.svg';
import not from '../assets/not.svg';
import objects from '../assets/objects.svg';
import conditions from '../assets/conditions.svg';

export const getTileType = (categoryName: string) => {
  switch (categoryName) {
    case 'Start':
      return {
        points: [0, -100, 100, -50, 0, 0, 0, 100, -90, 50],
        textPosition: { x: -60, y: 30 },
        fill: '#f9b43d',
        rotation: -60,
        svgShape: when,
      };
    case 'End':
      return {
        points: [-200, -50, 0, -50, 0, 50, -200, 50, -100, 0],
        textPosition: { x: -125, y: -5 },
        fill: '#f9b43d',
        rotation: 0,
        svgShape: end,
      };
    case 'Objects':
      return {
        // points for a top pointed hexagon
        points: [0, -100, 100, -50, 100, 50, 0, 100, -100, 50, -100, -50],
        textPosition: { x: -60, y: 0 },
        fill: '#eb555b',
        rotation: 0,
        svgShape: objects,
      };
    case 'Actions':
      return {
        points: [0, -50, -100, 0, 0, 50, 100, 0],
        textPosition: { x: -60, y: -5 },
        fill: '#f4aece',
        rotation: 0,
        svgShape: actions,
      };
    case 'Conditions':
      return {
        points: [0, -50, -100, 0, -100, 100, 0, 50, 100, 100, 100, 0],
        textPosition: { x: -60, y: 0 },
        fill: '#bababa',
        rotation: 0,
        svgShape: conditions,
      };
    case 'Negation':
      return {
        points: [0, -50, -100, 0, -100, 100, 0, 50, 100, 100, 100, 0],
        textPosition: { x: -60, y: 0 },
        fill: '#eb555b',
        rotation: 0,
        svgShape: not,
      };
    case 'Union':
      return {
        points: [-50, -100, -50, 100, 50, 50, 50, -50],
        textPosition: { x: -55, y: 0 },
        fill: '#bababa',
        rotation: 0,
        svgShape: and,
      };
    default:
      throw new Error('No Category Provided');
  }
};
