import React, { FC, useCallback, memo, useEffect } from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';

import Header from './Header';
import SideBar from '../../components/Layout/SideBar';
import useMediaQuery from '@/hooks/useMediaQuery.hook';
import { useUserAccountData } from '@/api/hooks/queries/user.hook';

import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { getExtendedMenu, getVisibleMenu } from '@/redux/features/appSlice';
import { toogleVisibleMenu, toogleExtendedMenu } from '@/redux/features/appSlice';
import PrivatePage from '@/hoc/PrivatePage';
import NoVerified from './NoVerified';
import Footer from './Footer';

import { useRouter } from 'next/router';

interface ILayoutProps {
  hideSideBar?: boolean;
  children: React.ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children, hideSideBar }) => {
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');
  const { push, pathname } = useRouter();
  const { data, isLoading } = useUserAccountData();
  const dispatch = useAppDispatch();

  const isExtended = useAppSelector(getExtendedMenu);
  const showSideBar = useAppSelector(getVisibleMenu);

  const handleSideBar = useCallback(() => {
    if (isMobileOrTablet) {
      dispatch(toogleVisibleMenu());
    } else {
      dispatch(toogleExtendedMenu());
    }
  }, [isMobileOrTablet]);

  useEffect(() => {
    // if (!data?.has_active_kitplan && pathname === '/welcome') {
    //   push('/admin');
    // }
    // if (!data?.has_active_kitplan) {
    //   push('/welcome');
    // }
  }, [data, pathname]);

  return (
    <PrivatePage>
      <div className="font-roboto flex h-screen w-screen flex-col bg-primary">
        {data?.email_verified && <Header handleSideBar={handleSideBar} />}
        <div className="flex flex-1 overflow-hidden">
          {data?.email_verified && (
            <SideBar isExtended={isExtended} isMobileOrTablet={isMobileOrTablet} visible={showSideBar} handleSideBar={handleSideBar} />
          )}

          <div className="container mx-auto flex flex-grow flex-col overflow-y-auto overflow-x-hidden">
            <div className="m-2 flex items-center flex-grow flex-col md:m-4 md:ml-0">
              {isLoading ? <ProgressSpinner /> : data?.email_verified ? children : <NoVerified dataUser={data} />}
            </div>
          </div>
        </div>
      </div>
    </PrivatePage>
  );
};

export default memo(Layout);
