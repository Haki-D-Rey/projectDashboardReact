import React, { FC } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { MdNumbers } from 'react-icons/md';
import { Button } from 'primereact/button';
import Input from '@/components/UI/Input';
import { resetPasswordStepTwoSchema, ResetPasswordStepTwoType } from '@/utils/validators/reset-password';

interface IStepTwoProps {
  onStepChange: (step: number) => void;
}

const StepTwo: FC<IStepTwoProps> = ({ onStepChange }) => {
  const { control, handleSubmit, formState } = useForm<ResetPasswordStepTwoType>({
    resolver: zodResolver(resetPasswordStepTwoSchema),
  });

  const handleChange = (data: ResetPasswordStepTwoType) => {
    try {
      console.log('🚀 ~ file: index.tsx:21 ~ handleChange ~ data:', data);
      onStepChange(2);
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:25 ~ handleChange ~ error:', error);
    }
  };

  return (
    <>
      <div className="space-y-3">
        <h2 className="text-lg md:text-[24px] leading-7 text-center md:text-2xl font-extrabold  text-primaryText">SE TE HA ENVIADO UN CODIGO DE SEGURIDAD</h2>

        <h3 className="text-center font-medium md:font-bold  text-primaryText">
          Se ha enviado un código temporal de 8 dígitos a tu correo electrónico. Ingresa ese código para reestablecer tu contraseña
        </h3>
      </div>
      <form className="my-4 flex flex-col gap-4 lg:px-20" onSubmit={handleSubmit(handleChange)}>
        <Input
          Icon={MdNumbers}
          name="code"
          control={control}
          inputProps={{
            type: 'number',
            placeholder: 'Ingresa el código',
            minLength: 8,
            maxLength: 8,
            style: {width: '100%', height: 40, fontSize: 12}
          }}
        />

        <Button type="submit" outlined label="Confirmar código" className="w-full" style={{color: 'white', width: '100%', height: 40, fontSize: 12}} disabled={!formState.isValid} loading={formState.isSubmitting} />
      </form>
    </>
  );
};

export default StepTwo;
