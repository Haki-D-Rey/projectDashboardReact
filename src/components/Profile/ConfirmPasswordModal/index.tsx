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
import ModalProfile from '@/components/UI/ModalProfile';

interface IConfirmPasswordModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSuccessValidation: () => void;
}

const ConfirmPasswordModal: FC<IConfirmPasswordModalProps> = ({ visible, setVisible, onSuccessValidation }) => {
  // const form = useForm<ConfirmPasswordType>({
  //   resolver: zodResolver(confirmPasswordSchema),
  // });
  // const login = useLogin();
  // const user = useUserData();

  // const onSubmitHandler = async (data: ConfirmPasswordType) => {
  //   try {
  //     const variables = {
  //       username: user.data?.email || '',
  //       password: data.password,
  //     };
  //     const response = await login.mutateAsync(variables);
  //     if (!response) {
  //       throw new Error('Contraseña incorrecta');
  //     }
  //     onSuccessValidation();
  //   } catch (error) {
  //     triggerError('Contraseña incorrecta', 'Error');
  //   }
  // };

  return (
    <ModalProfile title='Ingresa Nueva contraseña' setVisible={setVisible} visible={visible} nameBtn='Cambiar contraseña'>
      <input type="text" placeholder='Ingresa contraseña actual' className='p-1 w-[90%] bg-white rounded-xl placeholder:text-[15px] pl-4 placeholder:text-black' />
      <input type="text" placeholder='Ingresa nueva contraseña' className='p-1 w-[90%] bg-white rounded-xl placeholder:text-[15px] pl-4 placeholder:text-black' />
      <input type="text" placeholder='Confirmar nueva contraseña' className='p-1 w-[90%] bg-white rounded-xl placeholder:text-[15px] pl-4 placeholder:text-black' />
    </ModalProfile>
  );
};

export default ConfirmPasswordModal;
