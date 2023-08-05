import Layout from '@/components/Layout';
import type { NextPageWithLayout } from '@/pages/_app';
import React, { ReactElement } from 'react';

const Cofounder: NextPageWithLayout = () => {
  return <></>;
};

Cofounder.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Cofounder;
