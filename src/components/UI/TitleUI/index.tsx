import React, { FC } from 'react';
import SVGComponent from '../SvgFC';
import { ITitleUI } from '@/api/types/UI';
import { twMerge } from 'tailwind-merge';

const TitleUI: FC<ITitleUI> = ({ title, urlImage, onClickHandler = undefined, transparent = false, children, className }) => {
  return (
    <>
      <div className={twMerge(className)}>
        <div
          className={twMerge('relative h-[54px] w-[54px] rounded-xl bg-[#2e8e9e]', !onClickHandler?.buttonBack ? 'cursor-default' : 'cursor-pointer')}
          onClick={onClickHandler?.buttonBack}>
          <SVGComponent path={urlImage.path} src={urlImage.src} style={urlImage.style}></SVGComponent>
        </div>
        <div
          className={twMerge(
            'z-[1] flex items-center justify-center rounded-xl px-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]',
            transparent ? ' border-[2px] border-[#2e8e9e] bg-transparent' : ' bg-[#2e8e9e]',
            !onClickHandler?.buttonTitle ? 'cursor-default' : 'cursor-pointer'
          )}
          onClick={onClickHandler?.buttonTitle}>
          <h1 className="text-sm font-bold text-[#FFF] md:text-base lg:text-xl xl:text-2xl">{title}</h1>
        </div>
        {children}
      </div>
    </>
  );
};

export default TitleUI;
