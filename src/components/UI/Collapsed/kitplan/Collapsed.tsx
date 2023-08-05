import React, { useState, useRef, useEffect, useContext } from 'react';

import {collapseContext} from '@/context/CollapseProvider'

interface CollapsedProps {
  childrenTitle: React.ReactNode;
  childrenContent?: React.ReactNode;
}

function Collapsed({
  showCollapsed,
  childrenTitle,
  childrenContent,
}: CollapsedProps & { showCollapsed: boolean | undefined;  }) {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const {collapsedState, setCollapsedState} = useContext(collapseContext);

  const handleOutsideClick = (event : MouseEvent) => {
    if (containerRef.current && !containerRef.current?.contains(event.target as Node)) {
      setCollapsedState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`collapse ${ collapsedState ? "collapse-open" : "collapse-close"} w-full rounded-none bg-transparent`} 
      >
      <input type="checkbox" name="my-accordion-1" className='peer'  onClick={() => setCollapsedState(!collapsedState)}/> 
      
      {childrenTitle}

      <div className="collapse-content flex flex-col gap-2">
        {childrenContent}
      </div>
    </div>
  );
}


export default Collapsed;
