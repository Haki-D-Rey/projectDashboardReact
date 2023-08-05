import { Dialog } from 'primereact/dialog';
import React, { FC, useRef, useState } from 'react';

import Input from '@/components/UI/Input';
import PrimeDropdown from '@/components/UI/Dropdown';
import { useForm } from 'react-hook-form';
import { IStructureFormComponent } from '@/api/types/reisvestments';
import { ReivestmentType, reisvestmentSchema } from '@/utils/validators/withdrawal';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { changeWalletCode, useWalletProvider } from '@/hooks/useWalletProvider.hook';
import { DropdownChangeEvent } from 'primereact/dropdown';
import QRCode from 'react-qr-code';
import iconCopy from '/public/assets/modals/iconCopy.svg';
import useCopyToClipboard from '@/hooks/useCopyToClipboard.hook';
import { CreateIcon } from '@/utils/tools/utils';
import useMediaQuery from '@/hooks/useMediaQuery.hook';
import ButtonUI from '@/components/UI/Button';
import { IButtonUI } from '@/api/types/UI';
import { Toast } from 'primereact/toast';

interface IReinvestmentsModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ReinvestmentsModal: FC<IReinvestmentsModalProps> = ({ visible, setVisible }) => {
  const { handleSubmit, control, formState, register, reset, setValue } = useForm<ReivestmentType>({
    resolver: zodResolver(reisvestmentSchema),
  });
  let { wallets } = useWalletProvider();
  const [withdrawalOptions, setWithdrawalOptions] = useState<{ name: string; code: string; network: string }[]>([]);
  const [selectedAddres, setSelectedAddress] = useState<{ name: string; code: string; network: string }>();
  const [_, copy] = useCopyToClipboard();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useRef<Toast>(null);

  const handleDropdownChange = (event: DropdownChangeEvent) => {
    const response = changeWalletCode(event.value);
    setWithdrawalOptions(response);
    console.log(response);
    setValue('wallet_provider', event.value);
  };

  const handleWallet = (event: DropdownChangeEvent) => {
    const result = withdrawalOptions.find((item) => item['code'] === event.value);
    setSelectedAddress(result);
    if (result?.code) {
      setValue('wallet_address', event.value);
      setValue('wallet_network', result.code);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log('Imagen cargada:', selectedFile.name);
      toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const onCopyHandler = () => {
    copy(control._formValues['wallet_network'] || '');
  };
  const icon = CreateIcon({
    icon: iconCopy,
    imageProps: {
      width: 18,
      height: 18,
      alt: 'icono Cofundador',
      src: '',
      className: 'ml-3 text-white md:mr-2',
    },
  });

  const formInputs: IStructureFormComponent<ReivestmentType>[] = [
    {
      components: [
        {
          type: 'dropdown',
          name: 'wallet_provider',
          control: control,
          props: {
            placeholder: 'Seleccione una Exchange',
            optionLabel: 'name',
            optionValue: 'code',
            className: 'bg-[#111318] rounded-xl',
            options: wallets,
          },
          onCustomChange: handleDropdownChange,
        },
        {
          type: 'input',
          name: 'amount',
          control: control,
          props: {
            placeholder: 'Monto a reinveertir',
            className: 'bg-[#111318] text-[#FFFF]',
            keyfilter: 'money',
          },
        },
        {
          type: 'input',
          name: 'wallet_address',
          control: control,
          props: {
            placeholder: 'Hash de billetera emisora de pago',
            className: 'bg-[#111318] text-[#FFFF]',
          },
        },
        {
          type: 'input',
          name: 'transaction_hash',
          control: control,
          props: {
            placeholder: 'Hash de Transacción',
            className: 'bg-[#111318] text-[#FFFF]',
          },
        },
      ],
      sideNumberGridCol: 1,
    },
    {
      components: [
        {
          type: 'dropdown',
          name: 'wallet_network',
          control: control,
          props: {
            className: 'bg-[#111318]',
            options: withdrawalOptions,
            optionLabel: 'name',
            optionValue: 'code',
          },
          className: 'font-ligth text-gray-600',
          onCustomChange: handleWallet,
        },
        {
          type: 'QR',
        },
      ],
      sideNumberGridCol: 2,
    },
  ];

  const buttonFooter: IButtonUI[] = [
    {
      title: 'Adjuntar comprobante de pago',
      urlImage: {
        src: 'iconUploadImage',
        path: 'modals',
        style: {
          position: 'absolute',
          top: `${useMediaQuery('(max-width: 1024px)') ? '50%' : '50%'}`,
          left: `${useMediaQuery('(max-width: 1024px)') ? '50%' : '10px'}`,
          margin: 'auto',
          transform: 'translate(-50%, -50%)',
          maxWidth: '42px',
          maxHeight: '42px',
        },
      },
      buttonProps: {
        type: 'button',
        className: 'h-[60px] w-[80px] lg:w-[375px] bg-[#2E8E9E] p-5 border-2 border-white rounded-2xl',
      },
      styleClassname: '',
      onClickHanbdlerButtonUI: handleUploadButtonClick,
    },
    {
      title: 'Invertir',
      urlImage: {
        src: 'iconInvert',
        path: 'modals',
        style: {
          position: 'absolute',
          top: `${useMediaQuery('(max-width: 1024px)') ? '50%' : '50%'}`,
          left: `${useMediaQuery('(max-width: 1024px)') ? '50%' : '10px'}`,
          margin: 'auto',
          transform: 'translate(-50%, -50%)',
          maxWidth: '42px',
          maxHeight: '42px',
        },
      },
      buttonProps: {
        type: 'submit',
        className: 'h-[60px] w-[80px] lg:w-[150px] bg-[#2E8E9E] p-5 border-2 border-white rounded-2xl',
      },
      styleClassname: '',
      onClickHanbdlerButtonUI: () => {},
    },
  ];

  const onSubmitHandler = async (input: ReivestmentType) => {
    console.log(input);
  };

  return (
    <Dialog
      header={() => {
        return (
          <div className="flex flex-col items-center justify-center gap-2 p-2">
            <h1 className="text-3xl font-bold">Select Exchange</h1>
            <p className="text-center text-base font-light">Los planes están disponibles en: Binance, KuCoin y Bybit</p>
          </div>
        );
      }}
      className="mx-10 bg-[#1F222B]"
      headerClassName="p-[0.5rem_1rem_0_1rem]"
      visible={visible}
      style={{ width: '90%' }}
      onHide={() => setVisible(false)}
      pt={{
        closeButtonIcon: {
          className: 'w-[16px] h-[16px] md:w-[24px] md:h-[24px]',
        },
        closeButton: {
          className: 'absolute right-0 p-1 md:mt-3 md:p-2',
        },
        headerIcons: {
          className: 'right-1 sm:right-5 md:right-3 absolute md:relative',
        },
      }}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col gap-1 self-stretch md:grid md:grid-cols-2 md:grid-rows-1" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {formInputs.map((structure, i) => (
            <div key={i} className="flex flex-col gap-5 p-5">
              {structure.components.map((component, index: number) => (
                <React.Fragment key={index}>
                  {component.type === 'input' && <Input key={index} control={component.control} name={component.name} inputProps={component.props} />}
                  {component.type === 'dropdown' && (
                    <PrimeDropdown
                      key={index}
                      control={component.control}
                      name={component.name}
                      dropdownProps={component.props}
                      onCustomChange={component.onCustomChange}
                      labelProps={{
                        className: 'text-red',
                      }}
                    />
                  )}
                  {component.type === 'QR' && !!control._formValues['wallet_network'] && (
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="h-[144px] w-[144px] rounded bg-white p-4 md:h-[120px] md:w-[120px]">
                        <QRCode value={control._formValues['wallet_network'] || ''} style={{ width: '100%', height: '100%' }} />
                      </div>
                      <div className="flex min-w-[280px] max-w-[290] flex-col items-center text-center">
                        <p className="text-base font-semibold text-primaryText">Hash de la wallet:</p>
                        <div className="flex flex-row-reverse items-center">
                          <span className="break-all text-left text-xs font-light text-white lg:w-full">{control._formValues['wallet_network']}</span>
                          <br />
                          <Button
                            type="button"
                            onClick={onCopyHandler}
                            icon={icon}
                            pt={{
                              root: {
                                className: 'bg-transparent border-0',
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-x-3 p-[1rem_1rem_0_1rem]">
          {buttonFooter.map((button, index) => (
            <ButtonUI
              key={index}
              title={button.title}
              urlImage={button.urlImage}
              onClickHanbdlerButtonUI={button.onClickHanbdlerButtonUI}
              buttonProps={button.buttonProps}
              styleClassname={button.styleClassname}
            />
          ))}
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <Toast ref={toast}></Toast>
        </div>
      </form>
    </Dialog>
  );
};

export default ReinvestmentsModal;
