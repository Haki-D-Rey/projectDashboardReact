import React, { FC, useState, useContext, useRef, useEffect } from 'react';

import Image from 'next/image';
import {collapseContext} from '../../context/CollapseProvider'

import ArrowTop from '/public/assets/assets-globals/arrowTopIcon.svg';
import ArrowBottom from '/public/assets/assets-globals/arrowBottonIcon.svg';


interface TitleCollapseProps {
  title: String;
  localCollapse: boolean | undefined;
}

const TitleCollapse: FC<TitleCollapseProps> = ({ title, localCollapse }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [stateState, setStateState] = useState(localCollapse);
  const { collapsedState, setCollapsedState } = useContext(collapseContext);

  return (
    <div
      className={`collapse-title max-h-[30px] border-box flex justify-center gap-4 border-4 border-tertiary text-xl font-bold uppercase text-white ${
        collapsedState ? 'bg-tertiary peer-checked:bg-tertiary' : 'bg-primary'
      }`}
      ref={titleRef}
      >
      {title}
      <Image src={collapsedState ? ArrowTop : ArrowBottom} alt="" className="w-[25px] h-[25px] " />
    </div>
  );
};

export default TitleCollapse;