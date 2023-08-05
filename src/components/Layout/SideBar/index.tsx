import React, { FC, useState } from 'react';
import Image from 'next/image';

import { InputSwitch } from 'primereact/inputswitch';

import LogOutIcon from '/public/assets/assets-globals/logoutIcon.svg';
import ResumenGIcon from '/public/menu-icons/resumenGIcon.svg';
import TransactionIcon from '/public/menu-icons/trasactionIcon.svg';
import CofounderIcon from '/public/menu-icons/cofounderIcon.svg';
import TradingPlanIcon from '/public/menu-icons/tradingPIcon.svg';
import WithDrawalIcon from '/public/menu-icons/withDrawalsIcon.svg';
import ReinvestmentIcon from '/public/menu-icons/reinvestmentsIcon.svg';
import ProfileIcon from '/public/menu-icons/profileIcon.svg';
import MyNetworkIcon from '/public/menu-icons/networkIcon.svg';
import EmbudoIcon from '/public/menu-icons/embudoIcon.svg';

import { MdOutlineInsights } from 'react-icons/md';

import ItemLink from './ItemLink';

import { PageDashboardLinks } from '@/utils/constants/internal-links';
import { CreateIcon } from '@/utils/tools/utils';
interface ISideBarProps {
  visible: boolean;
  isExtended: boolean;
  isMobileOrTablet: boolean;
  handleSideBar: () => void;
}

const SideBar: FC<ISideBarProps> = ({ visible, isExtended, isMobileOrTablet, handleSideBar }) => {
  const width = isExtended || isMobileOrTablet ? 'lg:w-72' : 'lg:w-20';
  const [checked, setChecked] = useState<any>('');

  const cofunderIcon = CreateIcon({
    icon: CofounderIcon,
    imageProps: {
      width: 25,
      height: 25,
      alt: 'icono Cofundador',
      src: '',
    },
  });

  return (
    <aside
      className={`fixed z-30 flex h-[full] justify-start rounded-br-[50px] bg-secondary lg:static ${visible ? 'w-full' : 'w-0'} ${width}`}
      onClick={isMobileOrTablet ? handleSideBar : undefined}>
      <nav
        onClick={(e) => e.stopPropagation()}
        className={`${visible ? '' : ''} ease-in ${
          visible ? 'static ' : 'fixed mt-20 flex h-full flex-col justify-around bg-transparent lg:mt-0'
        } z-30 w-10/12 ${width} transform overflow-y-hidden transition duration-300 lg:static  lg:inset-0 lg:translate-x-0`}>
        <div className={`mx-auto flex flex-col items-${!isExtended ? 'start pl-2' : 'center'} w-full gap-2  text-gray-400`}>
          <div className={!isExtended ? 'rotate-90' : ''}>
            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
          </div>
          {isExtended ? <p>Modo: {checked ? 'oscuro' : 'claro'} activado </p> : ''}
        </div>

        <ul className="text-normal">
          <ItemLink icon={ResumenGIcon} {...{ isExtended, isMobileOrTablet }} text="Resumen General" href={PageDashboardLinks.Dashboard} />
          <ItemLink icon={TransactionIcon} {...{ isExtended, isMobileOrTablet }} text="Transacciones" href={''} />
          <ItemLink icon={cofunderIcon} {...{ isExtended, isMobileOrTablet }} text="Confounder" href={PageDashboardLinks.Confounder} />
          <ItemLink icon={<MdOutlineInsights />} {...{ isExtended, isMobileOrTablet }} text="Kit Plans" href={PageDashboardLinks.KitPlans} />
          <ItemLink icon={TradingPlanIcon} {...{ isExtended, isMobileOrTablet }} text="Planes de Trading" href={PageDashboardLinks.Trading} />
          <ItemLink icon={WithDrawalIcon} {...{ isExtended, isMobileOrTablet }} text="Retiros" href={PageDashboardLinks.Withdrawal} />
          <ItemLink icon={ReinvestmentIcon} {...{ isExtended, isMobileOrTablet }} text="Reinversiones" href="" />
          <ItemLink icon={ProfileIcon} {...{ isExtended, isMobileOrTablet }} text="Mi Perfil" href={PageDashboardLinks.Profile} />
          <ItemLink icon={MyNetworkIcon} {...{ isExtended, isMobileOrTablet }} text="Mi Red" href="" />
          <ItemLink icon={EmbudoIcon} {...{ isExtended, isMobileOrTablet }} text="Embudo de ventas" href="" />
        </ul>

        <div className={`flex flex-col items-${!isExtended ? 'start pl-4' : 'center'}`}>
          <Image src={LogOutIcon} alt="" className={isExtended ? 'h-12 w-12' : 'h-8 w-8'} />
          {isExtended ? <p className="py-2 text-white">Cerrar Sesión</p> : ''}
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
