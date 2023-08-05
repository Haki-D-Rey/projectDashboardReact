import React, { FC } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from 'primereact/button';
import Input from '@/components/UI/Input';
import PrimeCheckBox from '@/components/UI/CheckBox';

import { registerFormStepFourSchema, RegisterFormStepFourType, RegisterFormStepOneAndTwoType } from '@/utils/validators/register';

import { MdPercent } from 'react-icons/md';
import { animationStep } from '@/utils/tools/utils';
import useMediaQuery, { useIsMobile } from '@/hooks/useMediaQuery.hook';

interface IStepFourProps {
  values?: RegisterFormStepFourType;
  handleChange: (data: RegisterFormStepFourType) => void;
  data?: Partial<RegisterFormStepOneAndTwoType>;
  referral_code?: string;
  step: number;
  setStep: (value: number) => void;
}

const StepFour: FC<IStepFourProps> = ({ values, handleChange, data, referral_code, step, setStep }) => {
  const { control, handleSubmit, formState } = useForm<RegisterFormStepFourType>({
    resolver: zodResolver(registerFormStepFourSchema),
    defaultValues: {
      ...values,
      referral_code: '',
    },
  });

  const [useMobile, useDesktop, UseTableOrDesktop] = [useIsMobile, useMediaQuery('(min-width: 1280px)'), useMediaQuery('(max-width: 1280px)')];

  return (
    <form className="my-2 flex flex-col items-center gap-8" onSubmit={handleSubmit(handleChange)}>
      <h3 className="my-2 text-base font-bold text-primaryText md:text-2xl">Resumen de datos ingresados</h3>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-1">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-bold text-primaryText">Tu nombre completo</p>
          <p className="text-base font-medium text-primaryText ">
            {data?.first_name} {data?.last_name}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="break-all text-sm font-bold text-primaryText">Correo electrónico</p>
          <p className="break-all text-base font-medium text-primaryText">{data?.email}</p>
        </div>
      </div>
      {/* <hr className="border-1 w-full border-dashed border-neutral-500" /> */}

      <div className="w-full">
        <Input
          Icon={MdPercent}
          name="referral_code"
          control={control}
          inputProps={{
            type: 'text',
            placeholder: 'Ingresa tu código de referido',
            style: {
              borderRadius: '20px',
              border: 'none',
              height: `${useDesktop ? '48px' : '40px'}`,
              fontSize: `${useDesktop ? '18px' : '14px'}`,
              fontWeight: '300',
              color: 'white',
              width: '100%',
            },
          }}
        />
      </div>

      {/* <hr className="border-1 w-full border-dashed border-neutral-500" /> */}

      <PrimeCheckBox
        name="terms_and_conditions_accepted"
        control={control}
        label={
          <span className="label-text text-center text-xs text-white">
            He leído y estoy de acuerdo con los{' '}
            <a href="#" className="underline">
              Términos y condiciones de Barter Capital
            </a>{' '}
            y su Política de privacidad.
          </span>
        }
        inputProps={{
          className: 'w-full sm:w-[70%] lg:w-1/2',
          checked: false,
        }}
      />
      <div className="flex w-full justify-center gap-2 md:gap-5">
        <div
          className="flex h-[40px] w-[128px] cursor-pointer items-center justify-center rounded-[20px] border-0 bg-[#2E8E9E] text-white"
          onClick={() => {
            setStep(1);
            animationStep(1, 0, 2);
          }}>
          <span className="text-center font-light">Volver atras</span>
        </div>
        <Button
          type="submit"
          outlined
          label="Crear Cuenta"
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
            animationStep(2, 1, 2);
          }}
        />
      </div>
    </form>
  );
};

export default StepFour;
