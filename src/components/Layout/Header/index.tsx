import React, { FC, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { signOut } from 'next-auth/react';

import VerifyIcon from '/public/assets/assets-globals/verifyIcon.svg';
import BgBtnUser from '/public/assets/assets-globals/roundeIcon.svg';
import ReferralIcon from '/public/assets/assets-globals/referralIcon.svg';
import HambIconOpen from 'public/assets/assets-globals/hambIcon.svg';
import HambIconClosed from 'public/assets/assets-globals/hamIconOpen.svg';

import { useIsMobile } from '@/hooks/useMediaQuery.hook';
import ProfileMenu from './ProfileMenu';
import { useRouter } from 'next/router';
import { PageDashboardLinks } from '@/utils/constants/internal-links';

interface IHeaderProps {
  handleSideBar: () => void;
}

const Header: FC<IHeaderProps> = ({ handleSideBar }) => {
  const navigate = useRouter();
  const isSmall = useIsMobile();
  const [HeaderOpen, setHeaderOpen] = useState<boolean>(true);

  const handleLogout = async () => {
    await signOut();
    navigate.push(`${process.env.NEXT_PUBLIC_PROYECT_BASE_URL}`);
  };

  const goToNews = () => {
    navigate.push(PageDashboardLinks.News);
  };

  return (
    <nav className=" flex items-center justify-between bg-secondary px-4 py-3 md:px-6">
      <div className="flex items-center gap-6">
        <button
          onClick={() => {
            handleSideBar();
            setHeaderOpen(!HeaderOpen);
          }}
          className={`rounded-full p-[11px] ${!HeaderOpen ? 'bg-primary' : 'transparent'}`}>
          <Image src={!HeaderOpen ? HambIconOpen : HambIconClosed} alt="" className="h-6 w-6 fill-white" />
        </button>
        <Link href="/" className="mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed text-white">
          <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/logo/dashboard/logo-white-h.png'} alt="Logo" width={130} height={60} />
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <p className="flex h-[99%] items-center justify-center gap-2 rounded-xl bg-tertiary px-4 py-1 text-white">
          {' '}
          <Image src={ReferralIcon} alt="" className="h-4 w-4" /> Enlace de referido
        </p>
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full">
          <Image src={BgBtnUser} alt="" className="relative z-10 object-cover" />
          <div className={'fixed z-20 items-center lg:flex' + (HeaderOpen ? ' flex' : ' hidden')}>
            <ProfileMenu isSmall={isSmall} handleLogOut={handleLogout} />
          </div>
          <Image src={VerifyIcon} alt="" className="absolute -bottom-[9px] -right-[7px] z-20 h-6 w-6" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
