import React, { ReactElement, useState, useEffect } from 'react';

import { s3Client } from '@/utils/tools/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import Layout from '@/components/Layout';
import { triggerError, triggerLoading, triggerSuccess } from '@/utils/tools/message';

import { useUserData } from '@/api/hooks/queries/user.hook';
import { useTransaction } from '@/api/hooks/mutations/transaction.hook';

import type { IKitPlan } from '@/api/types/transaction';
import type { KitPlanFormTwoType, KitPlanFormThreeType } from '@/utils/validators/kitPlan';
import { BUCKET_URL, SIZE_2MB } from '@/utils/constants/utils';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { kitPlanFormTwoSchema } from '@/utils/validators/kitPlan';
import useCopyToClipboard from '@/hooks/useCopyToClipboard.hook';
import { useWalletProvider } from '@/hooks/useWalletProvider.hook';
import { Button } from 'primereact/button';
import QRCode from 'react-qr-code';
import Dropdown from '@/components/UI/Dropdown';
import { MdFileCopy } from 'react-icons/md';
import Input from '@/components/UI/Input';
import ImageUploader from '@/components/UI/ImageUploader';
import { useIsMobileOrTablet } from '@/hooks/useMediaQuery.hook';
import { NextPageWithLayout } from '@/pages/_app';

const KitPlanNew: NextPageWithLayout = () => {
  const isMobileOrTablet = useIsMobileOrTablet();

  const [formThree, setFormThree] = useState<KitPlanFormThreeType>();

  const { data } = useUserData();
  const transaction = useTransaction();

  const [_, copy] = useCopyToClipboard();
  const { wallets, setWalletProvider, networksOptions, address, setTransactionNetwork } = useWalletProvider();

  const kitForm = useForm<KitPlanFormTwoType>({
    resolver: zodResolver(kitPlanFormTwoSchema),
  });

  const walletProvider = useWatch({ control: kitForm.control, name: 'wallet_provider' });
  const transactionNetwork = useWatch({ control: kitForm.control, name: 'transaction_network' });

  const onSaveHandler = (data: KitPlanFormTwoType) => {
    // onNext(data);
  };

  const onCopyHandler = () => {
    copy(address || '');
  };

  const uploadImage = async (file: File, fecha: string) => {
    if (file.size > SIZE_2MB) throw new Error('La imagen no debe superar los 2MB');

    const extension = file.name.split('.').pop();
    const Key = `trx-kitplan/trading-${file.name}-${fecha}.${extension}`;

    const params = { Bucket: BUCKET_URL, Key, Body: file, ACL: 'public-read', ContentType: file.type };
    const response = await s3Client.send(new PutObjectCommand(params));
    console.log('Success', response);

    return { response, Key };
  };

  const onSaveThirdStep = async (form: KitPlanFormThreeType) => {
    triggerLoading('Guardando transacción...');

    try {
      /* if (!form.voucher_screenshot_file) throw new Error('Debe subir una imagen!');

      const fecha = new Date().toISOString();
      const { Key } = await uploadImage(form.voucher_screenshot_file, fecha);

      const response = await transaction.mutateAsync({
        wallet_address: form.wallet_address,
        voucher_screenshot: Key || '',
        wallet_provider: formTwo?.wallet_provider.toLowerCase() || '',
        transaction_hash: form?.transaction_hash || '',
        description: `$${selected?.price} Kit Plan`,
        amount: Number(selected?.price) || 0,
        transaction_type: 'kit-plan',
        user: data?.id || 0,
      });

      //trx-kitplan/trading-nombreimagen-fechahora.formato

      console.log('🚀 ~ file: index.tsx:44 ~ onSaveThirdStep ~ response:', JSON.stringify(response));

      triggerSuccess('Transacción guardada correctamente!');

      setFormThree(form);*/
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:56 ~ onSaveThirdStep ~ error:', JSON.stringify(error));
      console.log('🚀 ~ file: index.tsx:39 ~ onSaveThirdStep ~ error:', error);
      triggerError('Error al guardar la transacción!');
    }
  };

  useEffect(() => {
    if (walletProvider) {
      setWalletProvider(walletProvider);
    }
  }, [walletProvider]);

  useEffect(() => {
    if (transactionNetwork) {
      setTransactionNetwork(transactionNetwork);
    }
  }, [transactionNetwork]);

  return (
    <div className="flex flex-grow flex-col gap-2 overflow-hidden rounded-lg bg-secondary p-10">
      <h1 className="mb-4 text-center text-2xl font-bold text-primaryText">Compra un plan y comienza a invertir</h1>
      <div className="grid grid-cols-1 gap-10 overflow-y-auto lg:grid-cols-2">
        <div className="flex flex-grow flex-col gap-4">
          <Dropdown
            control={kitForm.control}
            name="wallet_provider"
            dropdownProps={{
              placeholder: 'Selecciona tu exchange',
              className: 'w-full',
              options: wallets,
              optionLabel: 'name',
              optionValue: 'code',
            }}
          />
          <Dropdown
            control={kitForm.control}
            name="transaction_network"
            dropdownProps={{
              placeholder: 'Selecciona tu red',
              className: 'w-full',
              options: networksOptions,
              optionLabel: 'name',
              optionValue: 'code',
            }}
          />
          <div className="flex flex-col items-start">
            <span className="text-center text-base font-semibold text-yellow-400">Monto mínimo a invertir: 100 USD</span>
            <span className="text-center text-base font-semibold text-yellow-400">Monto máximo a invertir: 1000 USD</span>
          </div>
          <Input
            control={kitForm.control}
            name="transaction_network"
            inputProps={{
              placeholder: 'Monto a Invertir',
            }}
          />
          <Input
            control={kitForm.control}
            name="transaction_network"
            inputProps={{
              placeholder: 'Dirección de la billetera',
            }}
          />
          <Input
            control={kitForm.control}
            name="transaction_network"
            inputProps={{
              placeholder: 'ID de la transación',
            }}
          />
        </div>
        <div className="flex flex-grow flex-col justify-between gap-4">
          <div className="flex max-w-full flex-col gap-4 lg:flex-row">
            <div className="rounded bg-primary p-2">
              <div className="rounded bg-white p-4">
                <QRCode className="w-full lg:h-24	lg:w-24" value={address || ''} />
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-primaryText">Hash de la wallet:</p>
              <div className="flex flex-wrap text-lg font-semibold text-green-400">
                <p className="flex-shrink break-all">{address}</p>
              </div>
              <Button label="Copiar Hash" onClick={onCopyHandler} icon={<MdFileCopy className="mr-2 text-primary" />} />
            </div>
          </div>
          <ImageUploader label="Subir captura de pantalla de confirmación" imgClx="w-full h-36" />
        </div>
      </div>
      <div className="mt-2 flex w-full items-center justify-center gap-4">
        <Button
          label="Realizar inversión"
          disabled={!kitForm.formState.isValid}
          loading={kitForm.formState.isSubmitting}
          onClick={kitForm.handleSubmit(onSaveHandler)}
          style={isMobileOrTablet ? { width: '100%' } : { paddingLeft: '8rem', paddingRight: '8rem' }}
        />
      </div>
    </div>
  );
};

KitPlanNew.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KitPlanNew;
