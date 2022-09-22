import React from 'react';

type TabProps = {
  tabText: string;
};

const Tab: React.FC<TabProps> = ({ tabText }) => {
  return <div>{tabText}</div>;
};

export default Tab;
