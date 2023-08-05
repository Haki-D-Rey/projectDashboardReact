import React, { FC, useEffect } from 'react';

import Input from '@/components/UI/Input';
import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';
import { useForm } from 'react-hook-form';
import { passwordSchema, PasswordType } from '@/utils/validators/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserData } from '@/api/hooks/queries/user.hook';
import { MdCode, MdMap, MdPassword, MdPhoneAndroid } from 'react-icons/md';
import Password from '@/components/UI/Password';
import { useResetPassword } from '@/api/hooks/mutations/user.hook';
import { triggerError, triggerLoading, triggerSuccess } from '@/utils/tools/message';

interface IChangePasswordModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ChangePasswordModal: FC<IChangePasswordModalProps> = ({ visible, setVisible }) => {
  const { control, handleSubmit, formState, reset } = useForm<PasswordType>({
    resolver: zodResolver(passwordSchema),
  });

  const changePassword = useResetPassword();

  const { data } = useUserData();

  const onSubmitHandler = async (form: PasswordType) => {
    console.log(form);
    try {
      triggerLoading('Actualizando contraseña', 'Por favor espere...');
      await changePassword.mutateAsync({ ...form, email: data?.email || '' });
      setVisible(false);
      triggerSuccess('Contraseña actualizada', 'La contraseña se actualizó correctamente');
    } catch (error: any) {
      triggerError('Error al actualizar contraseña', error.message);
      console.log('🚀 ~ file: index.tsx:34 ~ onSubmitHandler ~ error:', error);
    }
  };

  //reset form
  useEffect(() => {
    if (visible) {
      reset();
    }
  }, [visible]);

  return (
    <Dialog header="Actualizar Contraseña" className="mx-10" visible={visible} style={{ width: '35rem' }} onHide={() => setVisible(false)}>
      <form className="w-full p-4 text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex w-full items-center justify-between">
          <div className="w-full space-y-4">
            <Password
              showFooter={false}
              Icon={MdPassword}
              name="old_password"
              control={control}
              inputProps={{
                feedback: false,
                type: 'password',
                placeholder: 'Ingresa tu contraseña actual',
                autoComplete: 'current-password',
              }}
            />

            <Password
              showFooter
              Icon={MdPassword}
              name="new_password"
              control={control}
              inputProps={{
                type: 'password',
                placeholder: 'Ingresa tu contraseña nueva',
                autoComplete: 'new-password',
              }}
            />

            <Password
              showFooter={false}
              Icon={MdPassword}
              name="password_confirmation"
              control={control}
              inputProps={{
                feedback: false,
                type: 'password',
                placeholder: 'Confirma tu contraseña nueva',
                autoComplete: 'new-password',
              }}
            />
          </div>
        </div>
        <Button type="submit" label="Guardar Cambios" className="mt-4 w-1/2" disabled={!formState.isValid} loading={formState.isSubmitting} />
      </form>
    </Dialog>
  );
};

export default ChangePasswordModal;
