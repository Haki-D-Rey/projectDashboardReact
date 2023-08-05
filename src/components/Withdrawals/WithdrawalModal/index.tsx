import React, { FC, useEffect, useState } from 'react';

import { Dialog } from 'primereact/dialog';

import Input from '@/components/UI/Input';
import PrimeDropdown from '@/components/UI/Dropdown';

import { useForm } from 'react-hook-form';
import { useUserData } from '@/api/hooks/queries/user.hook';
import { useWalletProvider, changeWalletCode } from '@/hooks/useWalletProvider.hook';
import { useCreateWithdrawal } from '@/api/hooks/mutations/withdrawal.hook';
import { schemaWithDrawal, WithdrawalType } from '@/utils/validators/withdrawal';

import { zodResolver } from '@hookform/resolvers/zod';
import { triggerError, triggerSuccess } from '@/utils/tools/message';

import ButtonUI from '@/components/UI/Button';
import { IUrlImage } from '@/api/types/UI';
import { DropdownChangeEvent } from 'primereact/dropdown';
import useMediaQuery from '@/hooks/useMediaQuery.hook';
import { SelectItemOptionsType } from 'primereact/selectitem';
interface IWithdrawalModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  type: 'cofounder' | 'normal';
}

const WithdrawalModal: FC<IWithdrawalModalProps> = ({ visible, setVisible, type }) => {
  let { wallets } = useWalletProvider();
  const [withdrawalOptions, setWithdrawalOptions] = useState<{ name: string; code: string; network: string }[]>([]);
  const [selectedAddres, setSelectedAddress] = useState<{ name: string; code: string; network: string }>();
  const withdrawal = useCreateWithdrawal();
  const [useDesktop] = [useMediaQuery('(min-width: 1280px)')];
  const { data } = useUserData();

  const image: IUrlImage = {
    path: 'UI',
    src: 'retiro',
    style: {},
  };

  const product: SelectItemOptionsType = [
    {
      label: 'Dashboard',
      value: 'dashboard',
    },
    {
      label: 'Wallet',
      value: 'wallet',
    },
    {
      label: 'Publicidad',
      value: 'marketing',
    },
  ];

  const { handleSubmit, control, formState, setValue, reset, register } = useForm<WithdrawalType>({
    resolver: zodResolver(schemaWithDrawal),
    defaultValues: {
      name_services: type === 'cofounder' ? 'Cofundador' : '',
    },
  });
  console.log('🚀 ~ file: index.tsx:30 ~ formState:', formState.errors);

  const onSubmitHandler = async (input: WithdrawalType) => {
    console.log('🚀 ~ file: index.tsx:21 ~ onSubmitHandler ~ input:', input);
    try {
      // if (!input.voucher_screenshot) throw new Error('Debe de subir una captura de pantalla de confirmación');
      await withdrawal.mutateAsync({ ...input });
      triggerSuccess('Solicitud de retiro generada correctamente');
      setVisible(false);
    } catch (error: any) {
      console.log('🚀 ~ file: index.tsx:42 ~ onSubmitHandler ~ error:', error);
      triggerError(error?.message || 'Error al guardar la solicitud');
    }
  };

  const handleDropdownChange = (event: DropdownChangeEvent) => {
    const response = changeWalletCode(event.value);
    setWithdrawalOptions(response);
    reset({
      wallet_provider: event.value,
      wallet_address: '',
      wallet_network: '',
      withdrawal_type: '',
    });
  };

  const handleWallet = (event: DropdownChangeEvent) => {
    setSelectedAddress(withdrawalOptions.find((item) => item['code'] === event.value));
    setValue('wallet_address', event.value);
  };

  useEffect(() => {
    if (selectedAddres) {
      setValue('wallet_network', selectedAddres.network);
    }
  }, [selectedAddres, setValue]);

  useEffect(() => {
    if (visible) {
      // Restablecer el formulario cuando se muestra el modal
      reset({
        name_services: control._formValues.name_services,
      });
    }
  }, [visible]);

  return (
    <Dialog
      header="RETIRAR EFECTIVO"
      className="mx-10"
      visible={visible}
      style={{ width: '50rem' }}
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
      <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="grid w-full grid-cols-1">
          <div className="mx-[0] space-y-6 min-[1024px]:mx-[6rem]">
            <PrimeDropdown
              control={control}
              name="wallet_provider"
              dropdownProps={{
                placeholder: 'Seleccione una billetera',
                className: 'w-full',
                options: wallets,
                optionLabel: 'name',
                optionValue: 'code',
                style: {
                  borderRadius: '20px',
                  border: 'none',
                  height: `${useDesktop ? '48px' : '40px'}`,
                  fontSize: `${useDesktop ? '18px' : '14px'}`,
                  color: 'white',
                  backgroundColor: '#111318',
                },
                pt: {
                  trigger: {
                    className: 'asolute right-2',
                  },
                },
              }}
              onCustomChange={handleDropdownChange}
            />
            {type === 'cofounder' && (
              <>
                <Input
                  control={control}
                  name="name_services"
                  inputProps={{
                    placeholder: 'Dirección de la billetera',
                    className: 'w-full',
                    style: {
                      borderRadius: '20px',
                      border: 'none',
                      height: `${useDesktop ? '48px' : '40px'}`,
                      fontSize: `${useDesktop ? '18px' : '14px'}`,
                      fontWeight: '400',
                      color: 'white',
                      backgroundColor: '#111318',
                    },
                    // disabled: true,
                  }}
                />
                <PrimeDropdown
                  control={control}
                  name="product_change"
                  dropdownProps={{
                    placeholder: 'Seleccione un producto',
                    className: 'w-full',
                    options: product,
                    optionLabel: 'label',
                    optionValue: 'value',
                    style: {
                      borderRadius: '20px',
                      border: 'none',
                      height: `${useDesktop ? '48px' : '40px'}`,
                      fontSize: `${useDesktop ? '18px' : '14px'}`,
                      color: 'white',
                      backgroundColor: '#111318',
                    },
                    pt: {
                      trigger: {
                        className: 'asolute right-2',
                      },
                    },
                  }}
                />
              </>
            )}

            <Input
              control={control}
              name="wallet_address"
              inputProps={{
                placeholder: 'Dirección de la billetera',
                className: 'w-full',
                style: {
                  borderRadius: '20px',
                  border: 'none',
                  height: `${useDesktop ? '48px' : '40px'}`,
                  fontSize: `${useDesktop ? '18px' : '14px'}`,
                  fontWeight: '400',
                  color: 'white',
                  backgroundColor: '#111318',
                },
              }}
            />

            <PrimeDropdown
              control={control}
              name="withdrawal_type"
              dropdownProps={{
                placeholder: 'Seleccione fuente de ingreso',
                className: 'w-full',
                options: withdrawalOptions,
                optionLabel: 'name',
                optionValue: 'code',
                style: {
                  borderRadius: '20px',
                  border: 'none',
                  height: `${useDesktop ? '48px' : '40px'}`,
                  fontSize: `${useDesktop ? '18px' : '14px'}`,
                  color: 'white',
                  backgroundColor: '#111318',
                },
                pt: {
                  trigger: {
                    className: 'relative right-2',
                  },
                  input: {
                    className: 'text-[14px] xl:text-[18px]',
                  },
                },
              }}
              onCustomChange={handleWallet}
            />

            <Input
              control={control}
              name="wallet_network"
              inputProps={{
                placeholder: 'Red de Billetera',
                className: 'w-full',
                style: {
                  borderRadius: '20px',
                  border: 'none',
                  height: `${useDesktop ? '48px' : '40px'}`,
                  fontSize: `${useDesktop ? '18px' : '14px'}`,
                  fontWeight: '400',
                  color: 'white',
                  backgroundColor: '#111318',
                },
              }}
            />

            <Input
              control={control}
              name="amount"
              inputProps={{
                placeholder: 'Monto a retirar',
                className: 'w-full',
                type: 'text',
                style: {
                  borderRadius: '20px',
                  border: 'none',
                  height: `${useDesktop ? '48px' : '40px'}`,
                  fontSize: `${useDesktop ? '18px' : '14px'}`,
                  fontWeight: '400',
                  color: 'white',
                  backgroundColor: '#111318',
                },
                keyfilter: 'money',
              }}
            />

            <div className="m-auto flex w-[80%] items-center justify-center  min-[512px]:w-[40%]">
              <ButtonUI
                title="Generar solicitud"
                onClickHanbdlerButtonUI={() => {}}
                transparent={false}
                buttonProps={{
                  type: 'submit',
                  disabled: !formState.isValid,
                }}
                styleClassname=""
                urlImage={image}></ButtonUI>
            </div>
          </div>
        </div>
        <input type="hidden" {...register('type')} value={type} />
      </form>
    </Dialog>
  );
};

export default WithdrawalModal;
