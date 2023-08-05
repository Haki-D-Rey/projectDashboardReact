import { useMutation } from '@tanstack/react-query';
import { transaction } from '../../endpoints/transactions';
import { type IMutationTransactionArgs, type IResponseTransaction } from '../../types/transaction';

export function useTransaction() {
  return useMutation<IResponseTransaction, unknown, IMutationTransactionArgs>({
    mutationFn: transaction,
  });
}
