import React, { FC } from 'react';
import Image from 'next/image'
import CoinIcon from '/public/kitplans-assets/MonedaIcon.svg'
import BtnBuy from '/public/kitplans-assets/BtnBuy.svg'
interface IKitPlanItemProps {
  name: string;
  price: string;
  benefits: string[];
}

const KitPlanItem: FC<IKitPlanItemProps> = ({name, price, benefits}) => {
  return (
    <div className="flex gap-8 px-6 py-2">

      <div className="relative lg:w-[140px] lg:h-[140px] xl:h-[140px] xl:w-[140px]">
        <p className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform text-center lg:text-3xl font-bold text-white">
          $ {parseInt(price)}
        </p>
        <Image src={CoinIcon} alt="price_kit_plan" className='object-cover' />
      </div>

      <div className="flex-1 text-white">
        <h2 className="font-bold lg:text-[16px] 2xl:text-xl">{name}</h2>
        <ul className='space-y-[0px] xl:-space-y-[4px]'>
          {benefits.map((x) => (
            <li key={x} className='font-light lg:text-md xl:text-[14px]'>{x}</li>
           ))}
        </ul>
      </div>
      
      <div className="flex flex-2 justify-end pr-8">
        <Image src={BtnBuy} alt="Boton de compra" className='cursor-pointer w-[75%]'/>
      </div>

    </div>
  );
};

export default KitPlanItem;
