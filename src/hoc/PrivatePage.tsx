import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { FC, useEffect } from 'react';

interface IPrivatePageProps {
  children: React.ReactNode;
}

const PrivatePage: FC<IPrivatePageProps> = ({ children }) => {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Revisando...</div>;
  }

  if (status !== 'authenticated') {
    Router.push('/login');
  }

  return <>{children}</>;
};

export default PrivatePage;
