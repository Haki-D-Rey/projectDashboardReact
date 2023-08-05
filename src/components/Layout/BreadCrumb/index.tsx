import React, { FC, useCallback } from 'react';
import { MdChevronRight, MdHome, MdOutlineArrowRightAlt, MdOutlineHome } from 'react-icons/md';

import Link from 'next/link';

interface IBreadCrumbProps {}

interface ILinkData {
  name: string;
  path: string;
}

const BreadCrumb: FC<IBreadCrumbProps> = () => {
  return <></>;
  /*const location = useLocation();

  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const links: ILinkData[] = pathSnippets.map((_, index) => {
    const path = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const name = pathSnippets[index];
    return { name, path };
  });

  const breadcrumbItems = useCallback((data: ILinkData[]) => {
    const newUrls = data;
    const home = newUrls.shift();
    const lastElement = newUrls.pop();

    if (!home) return <span className="text-red-500">Error</span>;

    return (
      <>
        <li>
          <div className="flex items-center">
            <MdOutlineHome className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Link to={home.path} className="ml-1 py-2 text-sm font-medium capitalize text-gray-700 hover:text-gray-900  md:ml-2">
              {home.name}
            </Link>
          </div>
        </li>
        {newUrls.map(({ path, name }) => (
          <li key={path}>
            <div className="flex items-center">
              <MdChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <Link to={path} className="ml-1 py-2 text-sm font-medium capitalize text-gray-700 hover:text-gray-900  md:ml-2">
                {name}
              </Link>
            </div>
          </li>
        ))}
        {lastElement && (
          <li aria-current="page">
            <div className="flex items-center">
              <MdChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="ml-1 py-2 text-sm font-medium capitalize text-gray-500  md:ml-2">{lastElement.name}</span>
            </div>
          </li>
        )}
      </>
    );
  }, []);

  return (
    <nav aria-label="Breadcrumb" className="flex border-b border-dashed bg-white pl-2 md:border-b-0 md:bg-inherit md:pl-0">
      <ol className="flex items-center space-x-1 md:space-x-3">{breadcrumbItems(links)}</ol>
    </nav>
  );*/
};

export default BreadCrumb;
