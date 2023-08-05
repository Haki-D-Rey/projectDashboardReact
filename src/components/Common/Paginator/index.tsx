import React, { useState} from 'react'
import Image from 'next/image';

import ArrowTwo from '/public/assets/assets-globals/ArrowTwo.svg';
import ArrowOne from '/public/assets/assets-globals/ArrowPaginator.svg';

const Paginator = () => {
    const [index, setIndex] = useState<number>(1);

    return (
      <div className="flex h-[50px] py-1 w-full justify-center gap-4 bg-secondary">
        <Image src={ArrowTwo} alt="" className="w-6 cursor-pointer" />
        <Image src={ArrowOne} alt="" className="cursor-pointer" onClick={() => setIndex(index-1)}/>
        <div className="grid h-[45px] w-[45px] p-2 cursor-pointer place-content-center rounded-full border text-3xl font-semibold text-white border-tertiary">
          {' '}
          {index}{' '}
        </div>
        <Image src={ArrowOne} alt="" className="rotate-180 cursor-pointer"  onClick={() => setIndex(index+1)}/>
        <Image src={ArrowTwo} alt="" className="w-6 rotate-180 cursor-pointer" />
      </div>
    );
}

export default Paginator;