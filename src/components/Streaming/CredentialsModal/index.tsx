import React, { FC, useEffect } from 'react';

import { Dialog } from 'primereact/dialog';
import { useForm } from 'react-hook-form';
import { profileSchema, ProfileType } from '@/utils/validators/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserData } from '@/api/hooks/queries/user.hook';

import { HiDotsVertical } from 'react-icons/hi';
import { SiSpotify, SiNetflix } from 'react-icons/si';

interface ICredentialsModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const CredentialsModal: FC<ICredentialsModalProps> = ({ visible, setVisible }) => {
  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
  });

  const { data } = useUserData();

  const onSubmitHandler = (data: ProfileType) => {
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      form.setValue('address', data.address);
      form.setValue('zip_code', data.zip_code);
      form.setValue('phone_number', data.phone_number);
    }
  }, [data]);

  return (
    <Dialog header="Credenciales de mi plan" className="mx-10" visible={visible} style={{ width: '50rem' }} onHide={() => setVisible(false)}>
      <div className="h-full space-y-4 overflow-y-auto">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex w-full items-center gap-4 border-y border-slate-500 p-2">
              <div className="mx-5">
                {i % 2 === 0 ? (
                  <SiSpotify className="h-28 w-28 text-4xl text-green-500 " />
                ) : (
                  <SiNetflix className="h-28 w-28 text-4xl text-red-500 " />
                )}
              </div>
              <div className="w-full space-y-1">
                <div className="space-x-1">
                  <span className="text-lg font-semibold">Plataforma: </span>
                  <span className="text-sm text-gray-500">N/A</span>
                </div>
                <div className="space-x-1">
                  <span className="text-lg font-semibold">Usuario: </span>
                  <span className="text-sm text-gray-500">N/A</span>
                </div>
                <div className="space-x-1">
                  <span className="text-lg font-semibold">Contraseña: </span>
                  <span className="text-sm text-gray-500">N/A</span>
                </div>
                <div className="space-x-1">
                  <span className="text-lg font-semibold">Fecha de Inicio: </span>
                  <span className="text-sm text-gray-500">N/A</span>
                </div>
                <div className="space-x-1">
                  <span className="text-lg font-semibold">Fecha de Fin: </span>
                  <span className="text-sm text-gray-500">N/A</span>
                </div>
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-full hover:opacity-50">
                <HiDotsVertical className="text-2xl text-white" />
              </button>
            </div>
          ))}
      </div>
    </Dialog>
  );
};

export default CredentialsModal;
