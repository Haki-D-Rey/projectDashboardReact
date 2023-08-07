import React, { FC, useEffect } from 'react';

import Image from 'next/image';
import { Dialog } from 'primereact/dialog';

import LockProfile from '/public/assets/assets-globals/lockModal.svg'

interface IProfileProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    title: string;
    nameBtn: string;
    children: React.ReactNode;
    description?: string;
  }
  
  const ModalProfile: FC <IProfileProps> = ({title, nameBtn, visible, setVisible, children, description}) => {
  
    return (
      <Dialog
        header={
          <div className="flex flex-col items-center">
            <Image src={LockProfile} alt="" className="w-[18%]" />
            <h1 className="text-2xl font-bold uppercase mt-2">{title}</h1>
            {description && <p className='text-lg font-semibold'>{description}</p>}
          </div>
        }
        visible={visible}
        style={{  }}
        onHide={() => setVisible(false)}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <form className="flex flex-col items-center justify-center gap-4 w-[70%]">
            {children}
            <button className="mt-1 grid w-[70%] place-content-center rounded-lg bg-tertiary py-1 px-2 text-lg">{nameBtn}</button>
          </form>
        </div>
      </Dialog>
    );
  }

  export default ModalProfile;