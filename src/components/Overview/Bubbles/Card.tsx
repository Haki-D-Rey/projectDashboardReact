import React, { useEffect } from 'react';
import { gsap } from 'gsap';

import { useAppSelector } from '@/hooks/redux.hook';

import Image from 'next/image';
import Clock from 'public/assets/assets-globals/expirationKT.svg';
import wave0 from 'public/assets/assets-globals/wave0.svg';
import wave1 from 'public/assets/assets-globals/wave1.svg';
import { getExtendedMenu } from '@/redux/features/appSlice';

interface CardProps {
    title: string;
    investmentCost: string;
    monthlyProfit: string;
    networkGain?: string;
    paddingB?: string;
    icon: any;
    hasFunnel?: boolean;
}

function Card ({title, investmentCost, monthlyProfit, networkGain, icon, hasFunnel}: CardProps) {
  const isExtended = useAppSelector(getExtendedMenu);
  const timeline = gsap.timeline();

  useEffect(() => {
    const wavesLarge = document.querySelectorAll('.waves-large');
    const wavesCenter = document.querySelectorAll('.waves-center')
    const bgCircle = document.querySelectorAll('.waves-bottom')

    timeline.to(wavesCenter, {opacity: 1, height: 420, width: 200, duration: 3, bottom: -5})
    .to(wavesLarge, { opacity: 1, height: 500, width: 200, duration: 3, bottom: -5,   }, '-=2.8' )
    .to(bgCircle, {opacity: 1, translateY: -4, width: 220, duration: 3, bottom: -5,   }, "-=2.6")

  }, [])

    return (
      <div className="relative flex items-center rounded-l-xl bg-secondary lg:h-[120px] lg:w-[25%] xl:h-[170px] xl:w-[25%] lg:py-2 2xl:pl-2">
        <div className="flex h-[95%] flex-col justify-center text-white lg:gap-1 xl:gap-2">
          <h3 className="lg:w-[140px] lg:pl-4 xl:w-[85%] xl:text-left xl:pl-2 xl:mx-auto font-semibold leading-5 lg:text-xs xl:text-base 2xl:text-lg 2xl:leading-5 2xl:w-[95%]">
            Balance de {" "}
            {title}
          </h3>
          <p className="pl-4 lg:text-xs xl:text-base 2xl:text-lg lg:leading-[6px] xl:leading-[10px] 2xl:leading-4">
            Costo de inversion <br /> <span className="font-semibold lg:text-base xl:text-lg">$ {investmentCost}</span>{' '}
          </p>
          <p className="pl-4 lg:text-xs xl:text-base 2xl:text-lg lg:leading-[6px] xl:leading-[10px] 2xl:leading-5">
            Ganacia mensual <br /> <span className=" text-green-500 font-semibold lg:text-base xl:text-lg">$ {monthlyProfit}</span>{' '}
          </p>
          {networkGain && (
            <p className="hidden pl-4 text-base md:marker:block lg:leading-4 xl:leading-[10px]">
              Ganacia de red <br /> <span className="font-semibold text-green-500 md:text-2xl">$ {networkGain}</span>{' '}
            </p>
          )}
          {hasFunnel && (
            <div className="flex w-full lg:gap-1 xl:gap-2 pl-4">
              <Image src={Clock} alt="" className="lg:w-3 xl:w-4 self-center justify-self-center" />
              <p className="lg:text-[10px] lg:w-[65%] font-semibold leading-none text-green-700">
                Kit plan contratado
                <span className="lg:text-[9px] font-normal"> Vence 8/0/2023</span>
              </p>
            </div>
          )}
        </div>

        <div className={`absolute flex items-center justify-center overflow-hidden rounded-full bg-gray-300 md:h-full lg:h-[100%] ${isExtended ? 'lg:w-[120px] lg:-right-[40%] xl:w-[170px] xl:-right-[32%]' : 'lg:-right-[24%] lg:w-[120px] xl:-right-[24%] xl:h-[170px] xl:w-[170px]'}`}>
          <Image src={icon} alt="" className="absolute z-[60] object-contain opacity-25 lg:h-[90px] lg:w-[90px] xl:h-[110px] xl:w-[110px]" />
          <div className=" relative h-full w-full ">
            <Image src={wave1} alt="" className="waves-large waves absolute bottom-0 z-10 border" />
            <Image src={wave0} alt="" className="waves-center absolute bottom-0 z-20 flex justify-center " />
            <div className="waves-bottom absolute -bottom-48 z-50 h-[200px] w-[110%] bg-[#2E8E9E]"></div>
          </div>
        </div>
      </div>
    );
}

export default Card;