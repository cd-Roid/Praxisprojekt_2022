import React from 'react';

type TabProps = {
  tabText: string;
};

const Tab: React.FC<TabProps> = ({ tabText }) => {
  return <button>{tabText}</button>;
};

export default Tab;
