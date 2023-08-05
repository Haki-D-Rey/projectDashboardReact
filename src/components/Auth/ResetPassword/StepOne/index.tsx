import React, { FC } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { MdOutlineEmail } from 'react-icons/md';
import { Button } from 'primereact/button';
import Input from '@/components/UI/Input';
import { resetPasswordStepOneSchema, ResetPasswordStepOneType } from '@/utils/validators/reset-password';

interface IStepOneProps {
  onStepChange: (step: number) => void;
}

const StepOne: FC<IStepOneProps> = ({ onStepChange }) => {
  const { control, handleSubmit, formState } = useForm<ResetPasswordStepOneType>({
    resolver: zodResolver(resetPasswordStepOneSchema),
  });

  const handleChange = async (data: ResetPasswordStepOneType) => {
    try {
      console.log('🚀 ~ file: index.tsx:21 ~ handleChange ~ data:', data);
      onStepChange(1);
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:25 ~ handleChange ~ error:', error);
    }
  };

  return (
    <>
      <h2 className="my-6 text-center font-[24px] md:text-3xl font-extrabold leading-9 text-primaryText uppercase">Restablecer contraseña</h2>

      <form className="my-2 flex flex-col gap-4 sm:w-full sm:max-w-lg" onSubmit={handleSubmit(handleChange)}>
        <Input
          Icon={MdOutlineEmail}
          name="email"
          control={control}
          inputProps={{
            type: 'email',
            placeholder: 'Ingresa tu correo electrónico',
            style:{width: '100%', fontSize: '12px'}
          }}
        />

        <Button
          type="submit"
          outlined
          label="Cambiar mi contraseña"
          className="w-full"
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
          style={{
            height: '35px',
            fontSize: '14px',
            color: 'white'
          }}
        />
      </form>
    </>
  );
};

export default StepOne;
