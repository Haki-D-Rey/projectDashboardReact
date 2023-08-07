import React, { FC } from 'react';
import Image from 'next/image';

import { classNames } from 'primereact/utils';

import Link from 'next/link';
import { useRouter } from 'next/router';

export interface IItemProps {
  href?: string;
  text: string;
  end?: boolean;
  icon: any;
  isExtended: boolean;
  isMobileOrTablet: boolean;
  visible: boolean;
}

const ItemLink: FC<IItemProps> = ({ icon, text, href, isExtended, isMobileOrTablet, visible }) => {
  const router = useRouter();
  const paths = router.pathname.split('/');
  const currentPath = paths.length > 3 ? paths.slice(0, 3).join('/') : paths.join('/');
  const isCurrentPath = currentPath === href;

  return (
    <li>
      <Link
        href={href ? href : ''}
        className={classNames('flex items-center px-6 py-1 pr-2 transition-shadow duration-1000 ease-in-out hover:text-gray-100 ', {
          ' hover:bg-opacity-70': isCurrentPath,
          'hover:bg-gray-600 hover:bg-opacity-25': !isCurrentPath,
          'text-lg': !isExtended && !isMobileOrTablet,
        })}>
        <div className="relative flex items-center py-1 text-white">
          <Image className={isCurrentPath ? 'z-40 h-10 w-10 rounded-full border-2 border-tertiary bg-primary p-1' : 'h-[25px] w-[25px]'} src={icon} alt="" />
          
          { isExtended ? (
            <span className={isCurrentPath ? '-ml-3 rounded-r-lg border-2 border-tertiary bg-primary px-4' : '-ml-2 px-4'}>{text}</span>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

export default ItemLink;