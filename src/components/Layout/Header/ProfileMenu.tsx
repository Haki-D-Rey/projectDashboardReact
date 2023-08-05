import React, { FC, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';

import { useUserData } from '../../../api/hooks/queries/user.hook';
import { PageDashboardLinks } from '@/utils/constants/internal-links';
import ChangePasswordModal from '@/components/Profile/ChangePasswordModal';

type ProfileMenuProps = {
  isSmall?: boolean;
  handleLogOut: () => void;
};

const ProfileMenu: FC<ProfileMenuProps> = ({ isSmall, handleLogOut }) => {
  const menu = useRef<Menu>(null);
  const toast = useRef<Toast>(null);

  const router = useRouter();
  const { data, isLoading } = useUserData();
  const [visible, setVisible] = useState(false);

  const items: MenuItem[] = [
    {
      label: `${isLoading ? 'Cargando...' : data?.username}`,
      items: [
        {
          label: 'Ver Perfil',
          icon: 'pi pi-user',
          command: () => {
            router.push(PageDashboardLinks.Profile);
          },
        },
        {
          label: 'Cambiar Contraseña',
          icon: 'pi pi-wrench',
          command: () => {
            setVisible(true);
          },
        },
        {
          label: 'Salir',
          icon: 'pi-power-off',
          command: () => {
            handleLogOut();
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex justify-center overflow-hidden rounded-full text-primaryText">
        <Toast ref={toast}></Toast>
        <Menu model={items} popup ref={menu} />
        <Button text onClick={(e) => menu?.current?.toggle(e)}>
          <p className="font-bold text-white ">IA</p>
        </Button>
      </div>
      <ChangePasswordModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default ProfileMenu;
