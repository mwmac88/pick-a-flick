import React from 'react';

interface SidePanelProps {
  isSidePanelOpen: boolean;
  closeSidePanel: Function;
  children: React.ReactNode;
}

const SidePanel: React.FC<SidePanelProps> = ({
  isSidePanelOpen,
  closeSidePanel,
  children,
}) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full md:w-1/3 h-full bg-white z-10 transform transition-transform duration-200 ease-in-out ${
          isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {children}
      </div>
      <div
        className={`fixed top-0 right-0 w-0 md:w-2/3 h-full bg-black opacity-85 z-10 ${
          isSidePanelOpen ? 'visible' : 'invisible'
        }`}
        onClick={() => closeSidePanel()}
      ></div>
    </>
  );
};

export default SidePanel;
