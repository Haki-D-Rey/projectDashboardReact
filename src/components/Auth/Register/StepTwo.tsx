import React, { FC } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { MdOutlineMood, MdEmail, MdPassword, MdPhone } from 'react-icons/md';
import { registerFormStepTwoSchema, RegisterFormStepTwoType } from '@/utils/validators/register';
import { Button } from 'primereact/button';
import Input from '@/components/UI/Input';
import Password from '@/components/UI/Password';
import { animationStep } from '@/utils/tools/utils';
import useMediaQuery, { useIsMobile } from '@/hooks/useMediaQuery.hook';

interface IStepTwoProps {
  values?: RegisterFormStepTwoType;
  handleChange: (data: RegisterFormStepTwoType) => void;
  step: number;
  setStep: (value: number) => void;
}

const StepTwo: FC<IStepTwoProps> = ({ values, handleChange, step, setStep }) => {
  const { control, handleSubmit, formState } = useForm<RegisterFormStepTwoType>({
    resolver: zodResolver(registerFormStepTwoSchema),
    defaultValues: values,
  });
  const [useMobile, useDesktop, UseTableOrDesktop] = [useIsMobile, useMediaQuery('(min-width: 1280px)'), useMediaQuery('(max-width: 1280px)')];
  const [isMobile, isMobileorTablet] = [useMediaQuery('(max-width: 1024px)'), useMediaQuery('(max-width: 512px)')];

  return (
    <form className="my-4 flex flex-col gap-4" onSubmit={handleSubmit(handleChange)}>
      <h1 className="text-center text-xl font-bold text-white md:text-2xl">Ingresa los datos de tu cuenta</h1>
      <Input
        name="username"
        control={control}
        inputProps={{
          type: 'text',
          placeholder: 'Ingresa tu nombre de usuario',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            fontWeight: '400',
            color: 'white',
            backgroundColor: '#1F222B',
          },
        }}
      />
      <Input
        name="phone_number"
        control={control}
        inputProps={{
          type: 'text',
          placeholder: 'Ingresa tu número de teléfono',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            fontWeight: '400',
            color: 'white',
            backgroundColor: '#1F222B',
          },
          keyfilter: 'int',
        }}
      />
      <Input
        name="email"
        control={control}
        inputProps={{
          type: 'email',
          placeholder: 'Ingresa tu correo electrónico',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            fontWeight: '400',
            color: 'white',
            backgroundColor: '#1F222B',
          },
        }}
      />
      <Password
        showFooter
        name="password"
        control={control}
        inputProps={{
          type: 'password',
          placeholder: 'Ingresa tu contraseña',
          autoComplete: 'new-password',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            fontWeight: '300',
            color: 'white',
            backgroundColor: '#1F222B',
            width: '100%',
          },
          pt: {
            showIcon: { className: 'ml-6 relative right-1 bottom-2' },
            hideIcon: { className: 'ml-6 relative right-1 bottom-2' },
          },
        }}
        style={{
          inputClassName: 'w-full rounded-[20px] border-0 bg-[#1F222B]',
        }}
      />
      <Password
        name="confirm_password"
        control={control}
        inputProps={{
          feedback: false,
          type: 'password',
          autoComplete: 'new-password',
          placeholder: 'Confirma tu contraseña',
          className: 'rounded-[20px]',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            fontWeight: '300',
            color: 'white',
            width: '100%',
          },
          pt: {
            showIcon: { className: 'ml-6 relative right-1 bottom-2' },
            hideIcon: { className: 'ml-6 relative right-1 bottom-2' },
          },
        }}
        style={{
          inputClassName: 'w-full rounded-[20px] border-0 bg-[#1F222B]',
        }}
      />
      <div className="flex w-full justify-center gap-2 md:gap-5">
        <div
          className="flex h-[40px] w-[128px] cursor-pointer items-center justify-center rounded-[20px] border-0 bg-[#2E8E9E] text-white"
          onClick={() => {
            setStep(0);
            animationStep(0, 0, 1);
          }}>
          <span className="text-center font-light">Volver atras</span>
        </div>
        <Button
          type="submit"
          outlined
          label="Siguiente"
          className="flex w-full justify-center"
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
          style={{
            background: '#2E8E9E',
            border: 'none',
            borderRadius: '20px',
            color: 'white',
            width: '128px',
            height: '40px',
          }}
          onClick={() => {
            animationStep(2, 1);
          }}
        />
      </div>
    </form>
  );
};

export default StepTwo;
