import { NavigateFunction } from 'react-router-dom';

export const handleClick = (id: string, navigatorFunc: NavigateFunction) => {
  navigatorFunc(`/${id}`);
};
