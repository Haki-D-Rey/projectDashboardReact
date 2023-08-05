import React, { FC, useEffect, useState } from 'react';

import Image from 'next/image';

import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { triggerError, triggerLoading, triggerSuccess } from '@/utils/tools/message';
import { useVerifiedEmail } from '@/api/hooks/mutations/user.hook';

interface IActivateProps {}

type verificationStatus = 'success' | 'error' | 'loading';

const Activate: FC<IActivateProps> = ({}) => {
  const router = useRouter();
  const Verify = useVerifiedEmail();
  const { key } = router.query as { key?: string };
  console.log('🚀 ~ file: index.tsx:25 ~ key:', key);

  const [status, setStatus] = useState<verificationStatus>('loading');

  const onVerifyEmail = async (key: string) => {
    try {
      const response = await Verify.mutateAsync({ key });
      console.log('🚀 ~ file: index.tsx:28 ~ onSubmitHandler ~ response:', response);
      setStatus('success');
    } catch (error: any) {
      console.log('🚀 ~ file: index.tsx:30 ~ onSubmitHandler ~ error:', error);
      triggerError(
        error?.response?.data?.message ||
          'Ha ocurrido un error al verificar tu correo, por favor intenta de nuevo, si el problema persiste contacta a soporte.'
      );
      setStatus('error');
    }
  };

  useEffect(() => {
    console.log(key);
    if (key) {
      onVerifyEmail(key);
    }
  }, [key]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-primary text-white lg:gap-7">
      <Image
        className="mx-auto h-20 w-auto"
        src="https://d32m9psmi7z6jn.cloudfront.net/images/logo/dashboard/logo-white.png"
        alt="logo de barter capital"
        width={80}
        height={80}
      />
      <div className="flex h-[50%] w-[80%] flex-col items-center justify-around rounded-3xl border bg-secondary p-2 font-bold lg:h-[365px] lg:w-[1100px]">
        <h1 className="mx-auto text-center text-lg uppercase tracking-wide lg:text-[46px]">Tu cuenta ha sido verificada</h1>
        <p className="text-center text-xs md:text-[32px] md:font-light md:leading-8 md:tracking-tight">
          Tu cuenta ha sido creada exitosamente, inicia sesion para disfrutar de todos los beneficios en nuestra red de mercadeo.
        </p>
        <button
          className="rounded-lg border bg-primary p-2 text-white lg:p-4"
          onClick={() => {
            signOut();
          }}>
          Ir a iniciar sesion
        </button>
      </div>
    </div>
  );
};

export default Activate;
