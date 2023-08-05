import { ICustomHerders } from '@/api/types/UI';
import React, { FC } from 'react';
import ButtonUI from '../Button';
import { useIsMobile } from '@/hooks/useMediaQuery.hook';
import { twMerge } from 'tailwind-merge';

const CustonHerdersUI: FC<ICustomHerders> = ({ title, pathDividerContent }) => {
  const arrayWithoutChildren = pathDividerContent.secondPath.arrayButton.filter((e) => !e.children);
  const arrayWithChildren = pathDividerContent.secondPath.arrayButton.filter((e) => e.children);

  return (
    <div
      className="boxShadow-div
      mb-1 flex w-full justify-center rounded-[0.8rem] bg-[#2E8E9E] py-1 md:mb-[0.25rem] md:px-4 md:py-[0.5rem]">
      {title ? (
        title && <h1 className="text-xl text-[#FFFFFF]">{title}</h1>
      ) : (
        <div className="flex w-full flex-row items-center justify-around max-[768px]:gap-x-[0.5rem]">
          <div
            className={twMerge(
              'flex flex-col justify-center text-center',
              // eslint-disable-next-line react-hooks/rules-of-hooks
              `${useIsMobile() ? 'w-[55%]' : 'w-[45%]'}`
            )}>
            <h5 className="boxShadow-text text-[1rem] font-light text-[#FFFFFF] md:text-2xl">{pathDividerContent.firstPath.title}</h5>
            <span className="boxShadow-text text-[1.6rem] font-bold leading-8 text-[#FFFFFF] md:text-5xl">
              {pathDividerContent.firstPath.content}
            </span>
          </div>
          <div
            className={twMerge(
              'flex w-[55%] flex-row gap-x-3',
              // eslint-disable-next-line react-hooks/rules-of-hooks
              `${useIsMobile() ? 'w-[45%]' : 'w-[55%]'}`
            )}>
            <div className={pathDividerContent.secondPath.classDivParent}>
              {arrayWithoutChildren &&
                arrayWithoutChildren.map((e, i) => (
                  <ButtonUI
                    key={i}
                    title={e.title}
                    urlImage={e.urlImage}
                    onClickHanbdlerButtonUI={e.onClickHanbdlerButtonUI}
                    buttonProps={e.buttonProps}
                    styleClassname={e.styleClassname}
                  />
                ))}
            </div>
            {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              !useIsMobile() && (
                <div className={pathDividerContent.secondPath.classDivChildren}>
                  {arrayWithChildren &&
                    arrayWithChildren.map((e, i) => (
                      <ButtonUI
                        key={i + arrayWithoutChildren.length}
                        title={e.title}
                        urlImage={e.urlImage}
                        onClickHanbdlerButtonUI={e.onClickHanbdlerButtonUI}
                        buttonProps={e.buttonProps}
                        // eslint-disable-next-line react/no-children-prop
                        children={e.children}
                        expanded={e.expanded}
                        styleClassname={e.styleClassname}
                      />
                    ))}
                </div>
              )
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default CustonHerdersUI;
