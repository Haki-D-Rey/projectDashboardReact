import React, { FC, ReactNode, useEffect, useState } from 'react';

import { Dialog } from 'primereact/dialog';
import { SelectButton } from 'primereact/selectbutton';

import { useForm } from 'react-hook-form';
import { profileSchema, ProfileType } from '@/utils/validators/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserData } from '@/api/hooks/queries/user.hook';

import { HiDotsVertical } from 'react-icons/hi';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

type View = 'list' | 'grid';

const justifyOptions = [
  { icon: 'material-symbols:table-rows-rounded', value: 'list' },
  { icon: 'material-symbols:grid-3x3', value: 'grid' },
];

interface IHistoryModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

type ViewType = {
  icon: ReactNode;
  value: View;
};

const HistoryModal: FC<IHistoryModalProps> = ({ visible, setVisible }) => {
  const [value, setValue] = useState(justifyOptions[0].value);

  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
  });

  const { data } = useUserData();

  const justifyTemplate = (option: ViewType) => {
    return <span className="iconify text-xl" data-icon={option.icon}></span>;
  };

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
    <Dialog header="Capturas de transacción" className="mx-10" visible={visible} style={{ width: '50rem' }} onHide={() => setVisible(false)}>
      <div className="flex items-center gap-2 py-2 ">
        <div className="flex items-center gap-2">
          Mostrar como:
          <SelectButton
            value={value}
            onChange={(e) => setValue(e.value)}
            itemTemplate={justifyTemplate}
            optionLabel="value"
            options={justifyOptions}
          />
        </div>
        <h2>Filtrar por: </h2>
      </div>
      <div className="h-full space-y-4 overflow-y-auto">
        <div className={value === 'list' ? 'space-y-4' : 'grid grid-cols-3 gap-4'}>
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={classNames('relative flex w-full items-center gap-4 border-y border-slate-500 p-2', {
                  'flex-col rounded-xl border': value === 'grid',
                })}>
                <div className="mx-5">
                  <img src="https://i.imgur.com/1Q1Z1Z1.png" className="h-36" />
                </div>
                <div className="w-full space-y-1">
                  <div
                    className={classNames('space-x-1', {
                      'text-center': value === 'grid',
                    })}>
                    <span className="text-lg font-semibold">Nombre de transacción: </span>
                    <span className="text-sm text-gray-500">N/A</span>
                  </div>
                  <div
                    className={classNames('space-x-1', {
                      'text-center': value === 'grid',
                    })}>
                    <span className="text-lg font-semibold">Numero de transacción: </span>
                    <span className="text-sm text-gray-500">N/A</span>
                  </div>
                  <div
                    className={classNames('space-x-1', {
                      'text-center': value === 'grid',
                    })}>
                    <span className="text-lg font-semibold">Fecha de subida: </span>
                    <span className="text-sm text-gray-500">N/A</span>
                  </div>
                </div>
                <button
                  className={classNames('flex h-10 w-10 items-center justify-center rounded-full hover:opacity-50', {
                    'absolute right-0 top-0': value === 'grid',
                  })}>
                  <HiDotsVertical className="text-2xl text-white" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </Dialog>
  );
};

export default HistoryModal;
