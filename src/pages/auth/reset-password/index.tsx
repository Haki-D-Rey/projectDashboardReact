import React, { FC, useEffect, useState } from 'react';

import Image from 'next/image';

import { Button } from 'primereact/button';

import StepOne from '@/components/Auth/ResetPassword/StepOne';
import StepTwo from '@/components/Auth/ResetPassword/StepTwo';
import StepThree from '@/components/Auth/ResetPassword/StepThree';
import { rswitch } from '@/components/UI/Stepper';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { triggerError, triggerLoading, triggerSuccess } from '@/utils/tools/message';
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import { twMerge } from 'tailwind-merge';
import PublicPage from '@/hoc/PublicPage';

interface IResetPasswordProps {}

const ResetPassword: FC<IResetPasswordProps> = ({}) => {
  const router = useRouter();

  const [step, setStep] = useState(0);
  /* const resetPassword = useResetPasswordEmail();

  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const onResetPasswordEmail = async (key: string) => {
    try {
      /*const response = await Verify.mutateAsync({ key });
      console.log('🚀 ~ file: index.tsx:28 ~ onSubmitHandler ~ response:', response);
      setStatus('success');
    } catch (error: any) {
      console.log('🚀 ~ file: index.tsx:30 ~ onSubmitHandler ~ error:', error);
      triggerError(error?.response?.data?.message || 'Ha ocurrido un error.');
    }
  };*/

  return (
    <PublicPage>
      <div className="flex min-h-screen flex-col justify-center  bg-primary py-8 px-6 sm:px-6 lg:px-8">
        <div className={twMerge('space-y-4 py-4 sm:mx-auto sm:w-full sm:max-w-lg', `${step === 1 || step === 3 ? 'sm:max-w-2xl' : ''}`)}>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
              className="mx-auto h-20 w-auto"
              src="https://d32m9psmi7z6jn.cloudfront.net/images/logo/dashboard/logo-white.png"
              alt="logo de barter capital"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-neutral bg-secondary py-4 px-2 shadow sm:px-10">
            {rswitch(step, {
              0: <StepOne onStepChange={setStep} />,
              1: <StepTwo onStepChange={setStep} />,
              2: <StepThree onStepChange={setStep} />,
              3: (
                <div className="space-y-3 text-center">
                  <h2 className="text-center text-3xl font-extrabold uppercase text-primaryText">¡Tu contraseña ha sido reestablecida!</h2>

                  <h3 className="text-center font-bold  text-primaryText">
                    Tu contraseña se ha cambiado con exito, ingreso a tu cuenta con tu nueva contraseña
                  </h3>

                  <Button type="button" outlined label="Ir a iniciar sesión" onClick={() => router.push('/auth')} />
                </div>
              ),
            })}
          </div>
        </div>
      </div>
    </PublicPage>
  );
};

export default ResetPassword;
