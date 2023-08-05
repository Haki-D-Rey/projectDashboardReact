import { useMutation } from '@tanstack/react-query';
import { createWithdrawal } from '../../endpoints/withdrawals';
import type { IMutationCreateWithdrawalArgs, IResponseCreateWithdrawal } from '../../types/withdrawal';

export function useCreateWithdrawal() {
  return useMutation<IResponseCreateWithdrawal, unknown, IMutationCreateWithdrawalArgs>({
    mutationFn: createWithdrawal,
  });
}
