import React, { FC } from 'react';

import Input from '@/components/UI/Input';
import Password from '@/components/UI/Password';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordStepThreeSchema, ResetPasswordStepThreeType } from '@/utils/validators/reset-password';

import { MdOutlineMood, MdEmail, MdPassword, MdPhone } from 'react-icons/md';
import { Button } from 'primereact/button';

interface IStepThreeProps {
  onStepChange: (step: number) => void;
}

const StepThree: FC<IStepThreeProps> = ({ onStepChange }) => {
  const { control, handleSubmit, formState } = useForm<ResetPasswordStepThreeType>({
    resolver: zodResolver(resetPasswordStepThreeSchema),
  });

  const handleChange = (data: ResetPasswordStepThreeType) => {
    try {
      console.log('🚀 ~ file: index.tsx:21 ~ handleChange ~ data:', data);
      onStepChange(3);
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:25 ~ handleChange ~ error:', error);
    }
  };

  return (
    <>
      <h2 className="my-6 text-center text-3xl font-extrabold uppercase leading-9 text-primaryText">Ingresar nueva contraseña</h2>

      <form className="my-4 flex flex-col gap-4" onSubmit={handleSubmit(handleChange)}>
        <Password
          Icon={MdPassword}
          name="password"
          control={control}
          inputProps={{
            type: 'password',
            placeholder: 'Ingresa tu contraseña',
            autoComplete: 'new-password',
          }}
        />

        <Password
          showFooter={false}
          Icon={MdPassword}
          name="confirm_password"
          control={control}
          inputProps={{
            type: 'password',
            feedback: false,
            placeholder: 'Confirma tu contraseña',
            autoComplete: 'new-password',
          }}
        />

        <Button type="submit" outlined label="Cambiar contraseña" className="w-full" disabled={!formState.isValid} loading={formState.isSubmitting} />
      </form>
    </>
  );
};

export default StepThree;
