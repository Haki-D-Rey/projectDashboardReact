import React, { FC, useState } from 'react';
import Image from 'next/image';

import LogOutIcon from '/public/assets/assets-globals/logoutIcon.svg';
import { signOut } from 'next-auth/react';

import ResumenGIcon from '/public/menu-icons/resumenGIcon.svg';
import TransactionIcon from '/public/menu-icons/trasactionIcon.svg';
import KPIcon from '/public/menu-icons/KPIcon.svg';
import CofounderIcon from '/public/menu-icons/cofounderIcon.svg';
import TradingPlanIcon from '/public/menu-icons/tradingPIcon.svg';
import WithDrawalIcon from '/public/menu-icons/withDrawalsIcon.svg';
import ReinvestmentIcon from '/public/menu-icons/reinvestmentsIcon.svg';
import ProfileIcon from '/public/menu-icons/profileIcon.svg';
import MyNetworkIcon from '/public/menu-icons/networkIcon.svg'
import EmbudoIcon from '/public/menu-icons/embudoIcon.svg';

import ItemLink from './ItemLink';

import { PageDashboardLinks } from '@/utils/constants/internal-links';
import WithdrawalModal from '@/components/Withdrawals/WithdrawalModal';
import Toogle from '@/components/UI/Toogle';

interface ISideBarProps {
  visible: boolean;
  isExtended: boolean;
  isMobileOrTablet: boolean;
  handleSideBar: () => void;
}

const SideBar: FC<ISideBarProps> = ({ visible, isExtended, isMobileOrTablet, handleSideBar }) => {
  const width = isExtended || isMobileOrTablet ? 'lg:w-72' : 'lg:w-20';
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <aside
      className={`bg-transparent rounded-br-[50px] fixed z-30 flex h-[full] justify-start lg:static  ${
        visible ? 'w-20 ' : 'w-10'
      } ${width}`}
      onClick={isMobileOrTablet ? handleSideBar : undefined}>
      <nav
        onClick={(e) => e.stopPropagation()}
        className={`h-full ease-in fixed bg-secondary rounded-br-[50px]${
          visible ? 'h-full w-24 flex flex-col justify-around gap-1 rounded-br-[50px]' : ' flex flex-col justify-around gap-1 lg:mt-0'
        } z-30  w-10/12 ${width} transform overflow-y-hidden transition duration-300 lg:static lg:inset-0 lg:translate-x-0`}>
        
        <div className={`mx-auto flex flex-col items-${!isExtended ? 'center pl-4 ' : ' pl-8 mt-2 start'} gap-1 text-gray-400 w-full`}>
          <div className={`flex-shrink-0 ${!isExtended ? '-rotate-90 w-[65px] mt-1' : 'w-[90px]'}`}>
            <Toogle isChecked={checked} setIsChecked={setChecked} />
          </div>
          {isExtended ? <p className='text-sm'>Modo: {checked ? 'oscuro' : 'claro'} activado </p> : ''}
        </div>
        
        <ul className='text-[15px]'>
          <ItemLink icon={ResumenGIcon} {...{ isExtended, isMobileOrTablet, visible }} text="Resumen General" href={PageDashboardLinks.Dashboard} />
          <ItemLink icon={TransactionIcon} {...{ isExtended, isMobileOrTablet, visible }} text="Transacciones" href={PageDashboardLinks.Transactions} />
          <ItemLink icon={CofounderIcon} {...{ isExtended, isMobileOrTablet, visible }} text="Cofundadores" href={PageDashboardLinks.Cofounder} />
          <ItemLink icon={KPIcon} {...{ isExtended, isMobileOrTablet, visible }} text="Kit Plans" href={PageDashboardLinks.KitPlans} />
          <ItemLink icon={TradingPlanIcon} {...{ isExtended, isMobileOrTablet, visible }} text="Planes de Trading" href={PageDashboardLinks.Trading} />
          <ItemLink icon={WithDrawalIcon} {...{ isExtended, isMobileOrTablet, visible }} text="Retiros" href={PageDashboardLinks.Withdrawal} />
          <ItemLink icon={ReinvestmentIcon} {...{ isExtended, isMobileOrTablet, visible }} text="Reinversiones" href="" />
          <ItemLink icon={ProfileIcon} {...{ isExtended, isMobileOrTablet, visible }} text="Mi Perfil" href={PageDashboardLinks.Profile} />
          <ItemLink icon={MyNetworkIcon} {...{ isExtended, isMobileOrTablet, visible }} text="Mi Red" href={PageDashboardLinks.CodeReffered} />
          <ItemLink icon={EmbudoIcon} {...{ isExtended, isMobileOrTablet, visible }} text="Embudo de ventas" href="" />
        </ul>

        <div className={`flex flex-col ${!isExtended ? 'items-start pl-4' : 'items-start pl-8'}`} >
          <Image src={LogOutIcon} alt="" className={isExtended ? 'h-12 w-12 ml-8 cursor-pointer' : 'h-8 w-8 cursor-pointer'} onClick={() => signOut()} />
          {isExtended ? <p className="py-2 text-white lg:text-md cursor-pointer" onClick={() => signOut()}>Cerrar Sesión</p> : ''}
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;