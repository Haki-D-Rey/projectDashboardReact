import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

interface IPublicPageProps {
  children: React.ReactNode;
}

const PublicPage: FC<IPublicPageProps> = ({ children }) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <div>Revisando...</div>;
  }

  if (status === 'authenticated') {
    Router.push('/admin');
  }

  return <>{children}</>;
};

export default PublicPage;
