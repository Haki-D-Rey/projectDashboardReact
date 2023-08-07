import React, { ReactElement } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import { NextPageWithLayout } from '@/pages/_app';

import TitleUI from '@/components/UI/TitleUI';
import { IButtonUI } from '@/api/types/UI';
import { IUrlImage } from '@/api/types/UI';
import { ILineColors } from '@/api/types/util';

import CardCofounder from '@/components/Cofounder/Card'
import Graphic from '@/components/UI/ResponsiveStream';
import dataTest from '@/components/UI/ResponsiveStream/dataGraphic.json'
import { ProfitCard, LegendItem } from '@/components/UI/ProfitLegend';

import CofoundeItem from '../../../../public/assets/assets-globals/dashhboardItem.svg';
import WalletIcon from '/public/assets/assets-globals/walletIcon.svg';
import TradingIcon from '/public/assets/assets-globals/TradingIcon.svg';
import reinvestmentIcon from '/public/assets/assets-globals/reinvestIcon.svg';
import withdrawalIcon from '/public/assets/assets-globals/withdrawalIcon.svg'

const Cofounder: NextPageWithLayout = () => {
  const { push } = useRouter();

    const urlImage: IUrlImage = {
        path: 'assets-globals',
        src: 'arrowLeft',
        style: {}
    }

    const urlBtn: IUrlImage = {
      path: 'assets-globals',
      src: 'withdrawalIcon',
      style: {
        //height: '80px',
        //width: '80px',
        //border: '1px solid red'
      }
    }


    const data = [
      {
        name: 'dashboard',
        price: '2,100.00',
        icon: CofoundeItem,
        route: 'admin/cofounder/product/dashboard'
      },
      {
        name: 'wallet',
        price: '2,100.00',
        icon: WalletIcon,
        route: 'admin/cofounder/product/wallet'
      },
      {
        name: 'trading',
        price: '2,100.00',
        icon: TradingIcon,
        route: 'admin/cofounder/product/trading'
      },
    ]

    const lineColors : ILineColors = {
      "Producto Wallet": "#FF981D",
      "Producto Dashboard": "#2FD1CD ",
      "Producto Trading": "#1A77B5",
    };

  return (
    <div className="h-[98%] w-full ml-4">
      <div className="lg:h-full px-4 flex flex-col gap-4">
      <TitleUI title="BALANCE DE CONFUNDADOR" urlImage={urlImage} transparent={true} className='relative flex w-full flex-row justify-center text-center'/>

        <div className="mx-auto h-full w-full flex flex-col lg:gap-8 lg:justify-around xl:gap-6 2xl:justify-evenly 2xl:w-[90%] ">
          <div className="md:h-[40%] lg:h-[50%] xl:h-[43%] w-full gap-y-2 ">

            <div className="flex h-full w-full flex-row justify-between 2xl:px-[20px]">
              <div className="flex lg:w-[33%] h-full flex-col justify-center gap-4 2xl:gap-4">
                <ProfitCard profit="850.00" name="Ganancias Totales" isCofounder={false} />

                <LegendItem itemList={['Producto Dashboard', 'Producto Wallet', 'Producto Trading']} isCofounder={false} />
              </div>

              <div className="lg:w-[67%] justify-center items-center">
                
                <Graphic data={dataTest} tickValues={[0, 20, 40, 60, 80, 100]} lineColors={lineColors} nMax={100}/>
              </div>
            </div>

          </div>

          <div className="mx-auto flex justify-between lg:gap-1 lg:h-auto w-full 2xl:pl-6">
            {data.map((item, index) => (
              <CardCofounder key={index} name={item.name} price={item.price} image={item.icon} route={item.route}/>
            ))}
          </div>
          <div className="mx-auto flex justify-between px-2 lg:h-[40px] xl:h-[45px] gap-4 ">
            <button className='bg-tertiary w-[50%] lg:min-w-[130px] xl:min-w-[160px] flex gap-2 justify-center items-center lg:text-lg xl:text-xl  text-white font-bold rounded-lg border-2 px-2 text-shadow' >
              <Image src={reinvestmentIcon} alt='' className='lg:w-8 xl:w-10' />  Invertir 
            </button>
            <button className='bg-tertiary w-[50%] lg:min-w-[130px] xl:min-w-[160px] flex gap-2 justify-center items-center lg:text-lg xl:text-xl  text-white font-bold rounded-lg border-2 px-2 text-shadow' >
              <Image src={withdrawalIcon} alt='' className='lg:w-8 xl:w-10' />  Retirar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

Cofounder.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Cofounder;
