import React, { FC, useEffect, useState } from 'react';

import Image from 'next/image';

import { useRouter } from 'next/router';
import { useRegister } from '@/api/hooks/mutations/user.hook';
import { useSendActiveKey } from '@/api/hooks/mutations/user.hook';
import { useIsMobile } from '@/hooks/useMediaQuery.hook';

//SVG
import NewUserIcon from '/public/assets/register/iconNewUser.svg';

import StepOne from '@/components/Auth/Register/StepOne';
import StepTwo from '@/components/Auth/Register/StepTwo';
import StepFour from '@/components/Auth/Register/StepFour';
import Stepper, { rswitch, Step } from '@/components/UI/Stepper';
import PublicPage from '@/hoc/PublicPage';

import omit from 'lodash/omit';
import MySwal, { triggerError, triggerLoading, triggerSuccess } from '@/utils/tools/message';

import type { RegisterFormStepFourType, RegisterFormStepOneType } from '@/utils/validators/register';
import type { RegisterFormStepTwoType } from '@/utils/validators/register';
import type { IMutationRegisterArgs } from '@/api/types/user';
import TopBar from '@/components/UI/Topbar';
import { animationStep, changeStyleStepAnimation } from '@/utils/tools/utils';

interface IRegisterProps {}

const Register: FC<IRegisterProps> = ({}) => {
  const router = useRouter();
  const Register = useRegister();
  const sizeMobileOrTablet = useIsMobile();
  const sendToken = useSendActiveKey();
  const { referral_code } = router.query as { referral_code?: string };

  const [step, setStep] = useState(0);
  const [dataOne, setDataOne] = useState<RegisterFormStepOneType>();
  const [dataTwo, setDataTwo] = useState<RegisterFormStepTwoType>();
  const [dataFour, setDataFour] = useState<RegisterFormStepFourType>();

  const onStepOneSubmit = (data: RegisterFormStepOneType) => {
    setDataOne(data);
    setStep(1);
  };

  const onStepTwoSubmit = (data: RegisterFormStepTwoType) => {
    setDataTwo(data);
    setStep(2);
  };

  const onStepFourSubmit = async (data: RegisterFormStepFourType) => {
    setDataFour(data);
    try {
      if (!dataOne || !dataTwo || !data) {
        throw new Error('No se han completado todos los pasos');
      }

      triggerLoading('Creando cuenta', 'Espere un momento');
      data.referral_code = data.referral_code ? data.referral_code : '';
      const pureData: IMutationRegisterArgs = {
        ...dataOne,
        ...omit(dataTwo, ['confirm_password']),
        ...data,
      };

      const response = await Register.mutateAsync(pureData);
      console.log('🚀 ~ file: index.tsx:63 ~ onStepFourSubmit ~ response:', response);
      MySwal.fire({
        title: 'SE HA CREADO EXITOSAMENTE TU CUENTA',
        // html:
        //   'Se ha enviado un correo electrónico a <b>' +
        //   dataTwo.email +
        //   '</b> para verificar su cuenta. Por favor, revise su bandeja de entrada y haga clic en el enlace de verificación para completar el proceso de registro.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#FFC107',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/');
        }
      });
    } catch (error: any) {
      animationStep(2, 1);
      console.log('🚀 ~ file: index.tsx:54 ~ onStepFourSubmit ~ error:', error);
      triggerError(error?.response?.data?.message || 'Ha ocurrido un error y no se ha podido crear la cuenta', 'Error');
    }
  };

  useEffect(() => {
    changeStyleStepAnimation(step, '.step-info');
  }, [step]);

  return (
    <PublicPage>
      <div className="flex min-h-screen flex-col items-center gap-6 bg-BackgroundDark">
        <TopBar />
        <div className="flex flex-row justify-center gap-5">
          <Image src={NewUserIcon} className="h-[92px] w-[92px] md:h-[122px] md:w-[122px]" width={122} height={122} alt="icono registro"></Image>
        </div>

        <div className="w-[80%] md:w-[568px]">
          {rswitch(step, {
            0: <StepOne values={dataOne} handleChange={onStepOneSubmit} />,
            1: <StepTwo values={dataTwo} handleChange={onStepTwoSubmit} step={step} setStep={setStep} />,
            2: (
              <StepFour
                values={dataFour}
                handleChange={onStepFourSubmit}
                step={step}
                setStep={setStep}
                data={{ ...dataOne, ...dataTwo }}
                referral_code={referral_code}
              />
            ),
          })}
        </div>

        <Stepper className="-ml-4" onChange={setStep}>
          <Step index={0}></Step>
          <Step index={1}></Step>
          <Step index={2}></Step>
        </Stepper>

        <div className="text flex w-[90%] flex-row items-center justify-center gap-1 md:w-1/2 ">
          <p className="text-sm font-light text-[#FFF]">¿Ya tienes una cuenta?</p>
          <a
            className="cursor-pointer text-sm font-bold text-white "
            onClick={() => {
              router.push('/auth/');
            }}>
            Iniciar Sesión
          </a>
        </div>
      </div>
    </PublicPage>
  );
};

export default Register;
