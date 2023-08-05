import { ReactElement, ReactNode } from 'react';

import Script from 'next/script';
import { NextPage } from 'next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';

import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import PrimeReact from 'primereact/api';

//primereact styles
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

//import { Provider as ProviderRo, ErrorBoundary} from "@rollbar/react"
import type { AppProps } from 'next/app';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/styles/main.scss';
import { ApiClientV1, ApiClientV2 } from '../api/index';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ApiClientV2,
    },
  },
});

PrimeReact.ripple = true;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Script src="https://code.iconify.design/3/3.1.0/iconify.min.js" />
      <SessionProvider session={pageProps.session}>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>{getLayout(<Component {...pageProps} />)}</Hydrate>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Provider>
        </PersistGate>
      </SessionProvider>
    </>
  );
}
