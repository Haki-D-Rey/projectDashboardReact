import React, { ReactElement } from 'react';

import { useAppSelector } from '@/hooks/redux.hook';
import { getExtendedMenu } from '@/redux/features/appSlice';

import dynamic from 'next/dynamic';
import dataTest from '@/components/Overview/graphic.json';
import { ILineColors } from '@/api/types/util';

import Layout from '@/components/Layout';
import { LegendItem, ProfitCard } from '@/components/UI/ProfitLegend';

import Graphic from '@/components/UI/ResponsiveStream';

import Coin from '/public/assets/assets-globals/coin.svg';
import Coat from 'public/assets/assets-globals/coatMoney.svg';
import Gentleman from 'public/assets/assets-globals/gentlemanCo.svg'

import { NextPageWithLayout } from '../_app';
import Card from '@/components/Overview/Bubbles/Card';

 const CoinMarketCapWidgetNoSSR = dynamic(() => import('../../components/UI/CryptoWidget'), { ssr: true });

const Admin: NextPageWithLayout = () => {
  const isExtended = useAppSelector(getExtendedMenu);

  const lineColors: ILineColors = {
    "Balance de trading plan": "#FF981D",
    "Balance de kit plan": "#2FD1CD ",
    "Balance de cofundadores": "#1A77B5",
  };

  return (
    <div className="mx-auto flex flex-col justify-around gap-8 items-center h-full w-[110%] lg:-ml-12 xl:w-full max-w-[1300px]">
      <div className='h-[50px] overflow-hidden rounded-lg w-[98%]'>
       <CoinMarketCapWidgetNoSSR />
      </div>

      <div className={`flex h-auto w-[98%] items-center ${isExtended ? 'lg:gap-20 xl:gap-[110px]' : 'lg:gap-24 xl:gap-39 2xl:gap-40'}  md:h-auto xl:justify-start p-2 `}>
        <Card title="Kit Plans" investmentCost="100.00" monthlyProfit="1.20" icon={Coat} hasFunnel={true} />
        <Card title="Trading Plan" investmentCost="500.00" monthlyProfit="3.25" networkGain="0.25" icon={Coin} />
        <Card title="Confundadores" investmentCost="1,000.00" monthlyProfit="3.75" icon={Gentleman} />
      </div>

      <div className="flex lg:h-[40%] w-[98%] sm:flex-col lg:flex-row md:justify-center p-2">
        <div className="w-[33%] flex md:flex-row lg:flex-col gap-2 justify-around">
          <ProfitCard name='Ganancias Históricas' profit='8.18' isCofounder={false} />
          <LegendItem itemList={['Balance de Kit Plans', 'Balance de Trading Plan', 'Balance de Cofundadores']} isCofounder={false}/>
        </div>

        <div className="w-[67%] ">
            <Graphic data={dataTest} tickValues={[0, 100, 200, 300, 400, 500]} nMax={500} lineColors={lineColors}/>
        </div>

      </div>
    </div>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Admin;
