import React, { FC } from 'react';

import { Dialog } from 'primereact/dialog';
import { useForm } from 'react-hook-form';
import { confirmPasswordSchema, ConfirmPasswordType } from '@/utils/validators/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import Password from '@/components/UI/Password';
import { Button } from 'primereact/button';
import { triggerError, triggerLoading, triggerSuccess } from '@/utils/tools/message';
import { useUserData } from '@/api/hooks/queries/user.hook';
import { useLogin } from '@/api/hooks/mutations/user.hook';

interface IConfirmPasswordModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSuccessValidation: () => void;
}

const ConfirmPasswordModal: FC<IConfirmPasswordModalProps> = ({ visible, setVisible, onSuccessValidation }) => {
  const form = useForm<ConfirmPasswordType>({
    resolver: zodResolver(confirmPasswordSchema),
  });
  const login = useLogin();
  const user = useUserData();

  const onSubmitHandler = async (data: ConfirmPasswordType) => {
    try {
      const variables = {
        username: user.data?.email || '',
        password: data.password,
      };
      const response = await login.mutateAsync(variables);
      if (!response) {
        throw new Error('Contraseña incorrecta');
      }
      onSuccessValidation();
    } catch (error) {
      triggerError('Contraseña incorrecta', 'Error');
    }
  };

  return (
    <Dialog header="Ingresa tu contraseña" className="mx-10" visible={visible} style={{ width: '30rem' }} onHide={() => setVisible(false)}>
      <form className="w-full p-4 text-center" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <Password
          showFooter={false}
          name="password"
          control={form.control}
          inputProps={{
            feedback: false,
            type: 'password',
            autoComplete: 'current-password',
            placeholder: 'Ingresa tu contraseña',
          }}
        />
        <Button
          type="submit"
          outlined
          label="Confirmar"
          className="mt-4 w-full"
          disabled={!form.formState.isValid}
          loading={form.formState.isSubmitting}
        />
      </form>
    </Dialog>
  );
};

export default ConfirmPasswordModal;
