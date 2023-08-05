import { IButtonUI } from '@/api/types/UI';
import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import SVGComponent from '../SvgFC';
import { Button } from 'primereact/button';
import styles from './style.module.scss';
import useMediaQuery from '@/hooks/useMediaQuery.hook';

const ButtonUI: FC<IButtonUI> = ({ title, buttonProps, urlImage, onClickHanbdlerButtonUI = undefined, children, expanded, styleClassname }) => {
  return (
    <>
      {!children ? (
        <Button
          className={twMerge(styles['p-button'], styleClassname)}
          {...buttonProps}
          onClick={onClickHanbdlerButtonUI}
          disabled={buttonProps.disabled}
          loading={buttonProps.loading}>
          <div className="relative h-full w-[58px]">
            <SVGComponent path={urlImage.path} src={urlImage.src} style={urlImage.style}></SVGComponent>
          </div>

          {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            !useMediaQuery('(max-width: 1024px)') && (
              <div className={twMerge('z-[1] flex items-center justify-center rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]')}>
                <h1 className="text-sm font-bold text-[#FFF] md:text-base">{title}</h1>
              </div>
            )
          }
        </Button>
      ) : (
        <div
          className={twMerge(
            'border-white-1 flex flex-row items-center justify-center gap-1 rounded-xl border-2 border-solid border-[#ffffff]',
            // eslint-disable-next-line react-hooks/rules-of-hooks
            expanded ? `w-full` : `${buttonProps.className}`
          )}
          style={buttonProps.style}>
          <div className="relative h-[48px] w-[54px] cursor-pointer rounded-xl" onClick={onClickHanbdlerButtonUI}>
            <SVGComponent path={urlImage.path} src={urlImage.src} style={urlImage.style}></SVGComponent>
          </div>
          {children}
        </div>
      )}
    </>
  );
};

export default ButtonUI;
