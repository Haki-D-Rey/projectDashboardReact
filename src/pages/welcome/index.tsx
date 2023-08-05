import React, { ReactElement } from 'react';

import Layout from '@/components/Layout';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useGetAllKP } from '@/api/hooks/queries/transaction.hook';

import CollapsedWrapper from '@/components/UI/Collapsed/kitplan/CollapsedWrapper';
import type { NextPageWithLayout } from '../_app';

interface IWelcomeProps {}

const Welcome: NextPageWithLayout = ({}) => {
  const {data: dataKp, isLoading} = useGetAllKP();
  const categories = [...new Set(dataKp?.map((x) => x.kit_plan_category))]

  return (
    <div className="mx-auto lg:mr-[40px] xl:mr-[5%] 2xl:mr-[3%] mt-6 lg:mt-6 2xl:w-[92%] flex h-[90%] w-[90%] flex-grow flex-col items-center rounded-md bg-secondary">
       {
        !isLoading ?
        categories.map((category, index) => (
          <CollapsedWrapper
            key={category}
            title={`Kit Plan ${category}`}
            dataKp={dataKp?.filter((kpItem) => kpItem.kit_plan_category === category)}
            indexKey={index}
          />
        ))
        : <ProgressSpinner />
       }
    </div>
  );
};

Welcome.getLayout = function getLayout(page: ReactElement) {
  return <Layout hideSideBar={false}>{page}</Layout>;
};

export default Welcome;
