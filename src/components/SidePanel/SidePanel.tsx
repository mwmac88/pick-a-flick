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
        className={`fixed top-0 left-0 w-full md:w-1/3 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {children}
      </div>
      <div
        className={`fixed top-0 right-0 h-full bg-black opacity-85 z-40 transition-opacity duration-300 ease-in-out ${
          isSidePanelOpen
            ? 'opacity-85 translate-x-0 w-full'
            : 'opacity-0 -translate-x-full w-0'
        }`}
        onClick={() => closeSidePanel()}
      ></div>
    </>
  );
};

export default SidePanel;
