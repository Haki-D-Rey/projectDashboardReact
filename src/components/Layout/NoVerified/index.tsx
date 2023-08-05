import React, { FC, useState, useEffect, memo } from 'react';
import Image from 'next/image';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { useSession } from 'next-auth/react';
import { useSendActiveKey } from '../../../api/hooks/mutations/user.hook';

import {IResponseGetUserAccountData} from '../../../api/types/user'

import { triggerError, triggerLoading, triggerSuccess } from '@/utils/tools/message';
import { WAIT_TIME } from '@/utils/constants/utils';
import { getShowVerificationEmail, setShowVerificationEmail } from '@/redux/features/appSlice';

interface INoVerifiedProps {
  dataUser?: IResponseGetUserAccountData | null;
}

const NoVerified: FC<INoVerifiedProps> = ({dataUser}) => {
  const router  = useRouter();
  const { data } = useSession();
  const sendToken = useSendActiveKey();
  const dispatch = useAppDispatch();
  const isDisabled = useAppSelector(getShowVerificationEmail);

  const [visible, setVisible] = useState(false);

  const onClickSendEmail = async () => {
    try {
      //triggerLoading('Enviando correo, por favor espere...');
      //@ts-ignore
      await sendToken.mutateAsync({ id: data?.id || '' });
      //triggerSuccess(`Un código de verificación ha sido enviado correctamente, favor revise su correo`);

      dispatch(setShowVerificationEmail(true));
      setTimeout(() => {
        dispatch(setShowVerificationEmail(false));
      }, WAIT_TIME);
    } catch (error: any) {
      triggerError(error?.message || 'Error al enviar el correo');
    }
  };

  const mailForwarding = () => {
    if(!visible) {
      onClickSendEmail();
      setVisible(true);
    }
  }

  const handleLogOut = () => {
    signOut();
  }

  useEffect(() => {
    if(dataUser) {
      onClickSendEmail();
    }
    
  }, [dataUser])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-primary text-white lg:gap-7 -ml-2">
      <Image
        className="mx-auto h-20 w-auto"
        src="https://d32m9psmi7z6jn.cloudfront.net/images/logo/dashboard/logo-white.png"
        alt="logo de barter capital"
        width={80}
        height={80}
      />
      <div className="flex h-[50%] min-h-[330px] w-[80%] flex-col items-center justify-around rounded-3xl border bg-secondary p-2 md:py-4 lg:h-[365px] lg:w-[1100px]">
        <h1 className="uppercase tracking-wide text-lg text-center mx-auto lg:text-[35px] font-bold">Verificar Correo Electronico</h1>
        <p className="text-center text-[14px] px-2 md:px-0 md:text-[25px] md:font-light md:leading-8">
          Tu cuenta ha sido creada exitosamente, verifica tu correo para iniciar sesion y disfrutar de nuestros servicios
        </p>
        <button 
          className="rounded-lg border bg-primary p-2 md:text-lg lg:p-4 text-white font-bold " 
          onClick={handleLogOut}>
          Ir a iniciar sesion
        </button>
        <p className='text-center md:text-lg'>
          ¿No recibiste el correo?  {' '}
        <button 
          className="underline md:text-lg"
          disabled={visible? true : false} 
          onClick={mailForwarding}>
             Reenviar correo
        </button>
        </p>
     </div>
  </div>
  );
};

export default NoVerified;
