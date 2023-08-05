import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import {
  getAllKitPlans,
  getBalanceTypeOperation,
  getKitPlan,
  getPlansBalance,
  getTradingPlan,
  getTradingRevenueHistory,
  getTransactionALL,
} from '@/api/endpoints/transactions';
import { IQueryBalanceTypeOperation, IResponseBalanceTypeOperation, IResponseTransactionALL } from '@/api/types/transaction';

export function useGetKitPlanByUserId() {
  const session = useSession();
  // @ts-ignore
  const id = session.data?.id;

  const data = useQuery({
    queryKey: ['user-kitplans'],
    queryFn: async () => {
      if (!id) return null;
      return await getKitPlan({ id_user: id });
    },
  });

  return data;
}

export function useGetTradingPlanByUserId() {
  const session = useSession();
  // @ts-ignore
  const id = session.data?.id;

  const data = useQuery({
    queryKey: ['user-tradingplans'],
    queryFn: async () => {
      if (!id) return null;
      return await getTradingPlan({ id });
    },
  });

  return data;
}

export function useGetTradingRevenueHistoryByUserId() {
  const session = useSession();
  // @ts-ignore
  const id = session.data?.id;

  const data = useQuery({
    queryKey: ['user-trading-revenue-history'],
    queryFn: async () => {
      if (!id) return null;
      return await getTradingRevenueHistory({ id });
    },
  });

  return data;
}

export function useGetPlansBalanceByUserId() {
  const session = useSession();
  // @ts-ignore
  const id = session.data?.id;

  const data = useQuery({
    queryKey: ['user-plans-balance'],
    queryFn: async () => {
      if (!id) return null;
      return await getPlansBalance({ id });
    },
  });

  return data;
}

export function useGetAllKP() {
  const { isLoading, data } = useQuery(['all-kit-plans'], () => getAllKitPlans(), { staleTime: 518400000 });
  return { isLoading, data };
}

const useGetTransactionALL = (params: IQueryBalanceTypeOperation): UseQueryResult<IResponseTransactionALL> => {
  const data = useQuery<IResponseTransactionALL>(['user-typeoperation-balance'], async () => {
    return await getTransactionALL();
  });

  return data;
};

const useGetQueryBalanceTypeOperation = (params: IQueryBalanceTypeOperation): UseQueryResult<IResponseBalanceTypeOperation> => {
  const data = useQuery<IResponseBalanceTypeOperation>(['user-typeoperation-balance', params], async () => {
    try {
      return await getBalanceTypeOperation(params);
    } catch (error) {
      const data: IResponseBalanceTypeOperation = {
        count: 1,
        next: '',
        previous: '',
        results: [],
      };
      return data;
    }
  });

  return data;
};

export { useGetQueryBalanceTypeOperation, useGetTransactionALL };
