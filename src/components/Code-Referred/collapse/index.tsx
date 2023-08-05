import React, { FC, useContext } from 'react';

import Image from 'next/image';

import { collapseContext } from "@/context/CollapseProvider";
import ArrowLeft from '/public/assets/assets-globals/arrowTopIcon.svg';

interface ICodeReferredCollapse {
    name: string;
    lastName: string;
    countUser?: string | undefined;
    level?: string | undefined;
    straight?: string | undefined;
    arrow: boolean;
    isReferred: boolean;
}

const CodeReferredCollapse: FC<ICodeReferredCollapse> = ({ name, lastName, countUser, level, straight, arrow, isReferred}) => {
  const { collapsedState } = useContext(collapseContext);
  const imageIcon: string = `https://ui-avatars.com/api/?name=${name}+${lastName}&size=256&background=fff&color=2E8E9E&bold=true`;

  return (
    <div
      className={`collapse-title flex h-[110px] w-full items-center gap-4 ${
        !isReferred ? 'bg-secondary pl-4' : 'border border-gray-600 bg-[#111318] pl-16'
      } `}>
      {arrow && <Image src={ArrowLeft} alt="" className={`w-6 transition-all ${collapsedState ? 'rotate-120' : 'rotate-90'}`} />}
      <div className={`grid ${!isReferred ? 'h-[90px] w-[90px]' : 'h-[76px] w-[76px]'} place-content-center overflow-hidden rounded-full `}>
        <img src={imageIcon} alt="" className="h-full w-full object-cover" />
      </div>
      <div>
        <h1 className={`${!isReferred ? 'text-2xl' : 'text-xl'} font-semibold text-white`}>
          {name} {lastName}
        </h1>
        {countUser && <p className="font-light text-white">Usuario: {countUser}</p>}
        {level && <p className="font-light text-white">Nivel {level}</p>}
        {straight && <p className="font-light text-white">Directos: {straight}</p>}
      </div>
    </div>
  );
};

export default CodeReferredCollapse;
