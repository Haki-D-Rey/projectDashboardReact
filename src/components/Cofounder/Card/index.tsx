import React, { useEffect } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/router';

interface mainProps {
    name: string;
    price: string;
    image: any;
    route: string
}

const Main = ({ name, price, image, route } : mainProps) => {
  const { push } = useRouter();

  return (
    <div className="flex justify-center items-center lg:h-[115px] xl:h-[130px] lg:w-[33%] 2xl:h-[150px] md:gap-4 lg:gap-4 rounded-2xl bg-secondary text-white cursor-pointer"
      onClick={() => push(`/${route}`)}
    >
      <Image src={image} alt="" className='lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px] 2xl:w-[80px] 2xl:h-[80px] ' />
      <div className="flex flex-col justify-center h-full gap-2">
        <h1 className="uppercase md:text-[20px] lg:text-xl xl:text-2xl 2xl:text-3xl">{name}</h1>
        <div className="h-[4px] w-full bg-white">.</div>
        <h1 className='md:text-[18px] lg:text-xl xl:text-2xl 2xl:text-3xl'>$ {price}</h1>
      </div>
    </div>
  );
};

export default Main;