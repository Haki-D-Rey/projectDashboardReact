import React, { FC, memo } from 'react';

import Image from 'next/image';

interface IFooterProps {}

const Footer: FC<IFooterProps> = ({}) => {
  const year = new Date().getFullYear();
  return (
    <div className="flex w-full items-center justify-center gap-8 pt-4">
      <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/logo/full-logo-yellow.png'} alt="Logo" width={100} height={30} />
      <span className="ml-2 text-sm text-white">© {year} - All rights reserved</span>
    </div>
  );
};

export default memo(Footer);
