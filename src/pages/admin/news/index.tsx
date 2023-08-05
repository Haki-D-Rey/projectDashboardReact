import React, { ReactElement } from 'react';

import Layout from '@/components/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import NewsItem from '@/components/News/NewsItem';

const News: NextPageWithLayout = () => {
  return (
    <div className="flex flex-grow flex-col rounded-xl bg-secondary p-4">
      <h1 className="text mb-4 text-2xl font-bold text-primaryText">Ultimas noticias</h1>
      <div className="relative flex-grow flex-col overflow-y-auto">
        <div className="absolute inset-0">
          <div className="space-y-5">
            {[1, 2, 3, 4, 5].map((value) => {
              return <NewsItem key={value} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

News.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default News;
