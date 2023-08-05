import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login, register, resetPassword, sendActiveKey, updateEditUser, verifyEmail } from '../../endpoints/users';

import type { IMutationEditUserArgs, IResponseLogin, IResponsePostUserUpdate } from '../../types/user';
import type { LoginFormType } from '@/utils/validators/login';
import type { IMutationRegisterArgs, IResponseRegister } from '../../types/user';
import type { IMutationVerifyEmailArgs, IResponseVerifyEmail } from '../../types/user';
import type { IResponseSendActiveKey, IMutationSendActiveKey } from '../../types/user';
import type { IResponseResetPassword, IMutationResetPasswordArgs } from './../../types/user';

export function useLogin() {
  return useMutation<IResponseLogin, unknown, LoginFormType>({
    mutationFn: login,
  });
}

export function useRegister() {
  return useMutation<IResponseRegister, unknown, IMutationRegisterArgs>({
    mutationFn: register,
  });
}

export function useResetPasswordEmail() {
  return useMutation<IResponseVerifyEmail, unknown, IMutationVerifyEmailArgs>({
    mutationFn: verifyEmail,
  });
}

export function useVerifiedEmail() {
  return useMutation<IResponseVerifyEmail, unknown, IMutationVerifyEmailArgs>({
    mutationFn: verifyEmail,
  });
}

export function useSendActiveKey() {
  return useMutation<IResponseSendActiveKey, unknown, IMutationSendActiveKey>({
    mutationFn: sendActiveKey,
  });
}

export function useResetPassword() {
  return useMutation<IResponseResetPassword, unknown, IMutationResetPasswordArgs>({
    mutationFn: resetPassword,
  });
}

export function useUpdateEditUser() {
  const queryClient = useQueryClient();

  return useMutation<IResponsePostUserUpdate, unknown, IMutationEditUserArgs>({
    mutationFn: updateEditUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
    },
  });
}
