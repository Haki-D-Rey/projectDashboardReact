import React, { ReactElement } from 'react';

import Layout from '@/components/Layout';
import { NextPageWithLayout } from '@/pages/_app';

const Benefits: NextPageWithLayout = () => {
  return (
    <div className="flex-grow border border-red-500">
      <h1>Benefits</h1>
    </div>
  );
};

Benefits.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Benefits;
