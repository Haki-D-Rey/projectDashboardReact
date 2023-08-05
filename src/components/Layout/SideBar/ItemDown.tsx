import React, { FC, useState } from 'react';
import { useAppDispatch } from './../../../hooks/redux.hook';
import { setExtendMenuItemDown } from '@/redux/features/appSlice';
import { classNames } from 'primereact/utils';

import { useRouter } from 'next/router';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { IItemProps } from './ItemLink';

interface IItemDownProps {
  href: string;
  text: string;
  end?: boolean;
  icon: React.ReactNode;
  isExtended: boolean;
  isMobileOrTablet: boolean;
  children?: React.ReactNode;
}

const ItemDown: FC<IItemDownProps> = ({ icon, text, href, isExtended, isMobileOrTablet, children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const paths = router.pathname.split('/');
  const currentPath = paths.length > 3 ? paths.slice(0, 3).join('/') : paths.join('/');

  //get href prop from children React.ReactNode and compare with currentPath
  const isCurrentPathChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const { href } = child.props as IItemProps;
      return href === currentPath;
    }
    return false;
  }) as boolean[];

  const isCurrentPath = isCurrentPathChildren.includes(true);
  const handleClick = () => {
    setIsExpanded(!isExpanded);
    dispatch(setExtendMenuItemDown(true));
  };
  return (
    <li>
      <button
        onClick={handleClick}
        className={classNames('relative flex w-full items-center px-6 py-4 pr-2 transition-shadow duration-1000 ease-in-out hover:text-gray-100 ', {
          'bg-accent text-primary hover:bg-opacity-70': isCurrentPath,
          'text-primaryText hover:bg-gray-600 hover:bg-opacity-25': !isCurrentPath,
          'text-lg': !isExtended && !isMobileOrTablet,
        })}>
        {icon}
        {isExtended || isMobileOrTablet ? <span className="mx-4">{text}</span> : null}
        {isExpanded ? <MdArrowDropUp className="absolute right-4 text-2xl" /> : <MdArrowDropDown className="absolute right-4 text-2xl" />}
      </button>
      {isExpanded && <ul className="ml-5 flex flex-col py-2">{children}</ul>}
    </li>
  );
};

export default ItemDown;
