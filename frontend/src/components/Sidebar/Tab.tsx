import React from 'react';

type Props = {
  tabText: string;
  tabIndex: number;
  onClickAction: () => void;
};

const Tab: React.FC<Props> = ({ tabIndex, tabText, onClickAction }) => {
  return (
    <button
      onClick={onClickAction}
      className={tabIndex === 1 ? 'tabs active-tabs' : 'tabs'}
    >
      {tabText}
    </button>
  );
};

export default Tab;
