import { useBoardState } from '../state/BoardState';

export const useToggle = () => {
  const isOpen = useBoardState((state) => state.modalOpen);
  const setIsOpen = useBoardState((state) => state.toggleModal);

  const toggleForm = (): void => {
    setIsOpen(!isOpen);
  };

  return { toggleForm, isOpen };
};
