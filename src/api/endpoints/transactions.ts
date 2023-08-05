import { ApiClientV1, ApiClientV2 } from '../index';
import type { IQueryBalanceTypeOperation, IResponseBalanceTypeOperation, IResponseKitPlan, IResponseTransaction, IResponseTransactionALL } from '../types/transaction';
import type { IMutationTransactionArgs } from '../types/transaction';

import type { IQueryGetKitPlanArgs, IResponseGetKitPlans } from '../types/transaction';
import type { IQueryGetTradingPlanArgs, IResponseGetTradingPlans } from '../types/transaction';
import type { IQueryGetPlansBalanceArgs, IResponseGetPlansBalance } from '../types/transaction';
import type { IQueryGetTradingRevenueHistoryArgs, IResponseGetTradingRevenueHistory } from '../types/transaction';

const api = ApiClientV1();
const apiV2 = ApiClientV2();

export async function transaction(data: IMutationTransactionArgs): Promise<IResponseTransaction> {
  const response = await api.post('/transaction/', data);
  return response.data;
}

export async function getKitPlan(data: IQueryGetKitPlanArgs): Promise<IResponseGetKitPlans[]> {
  const response = await api.get(`/plans/${data.id_user}/by_user/`);
  return response.data;
}

export async function getAllKitPlans(): Promise<IResponseKitPlan[]> {
  const response = await apiV2.get('/global_settings/kitplans/');
  return response.data;
}

export async function getTradingPlan(data: IQueryGetTradingPlanArgs): Promise<IResponseGetTradingPlans[]> {
  const response = await api.get(`/trading_plans/${data.id}/by_user/`);
  return response.data;
}

export async function getTradingRevenueHistory(data: IQueryGetTradingRevenueHistoryArgs): Promise<IResponseGetTradingRevenueHistory[]> {
  const response = await api.get(`/users/${data.id}/trading_revenue_history/`);
  return response.data;
}

export async function getPlansBalance(data: IQueryGetPlansBalanceArgs): Promise<IResponseGetPlansBalance[]> {
  const response = await api.get(`/users/${data.id}/plans_balance/`);
  return response.data;
}

export async function getTransactionALL(): Promise<IResponseTransactionALL> {
  const response = await apiV2.get('/transactions/user-transactions/');
  return response.data;
}

const getBalanceTypeOperation = async (params: IQueryBalanceTypeOperation): Promise<IResponseBalanceTypeOperation> => {
  const response = await apiV2.get<IResponseBalanceTypeOperation>(`/transactions/user-balance-history/`, {
    params: params,
  });
  return response.data;
};

const getBalanceTypeOperationDonwload = async (params: IQueryBalanceTypeOperation): Promise<any> => {
  const response = await apiV2.get<string>(`/transactions/user-balance-history/download/`, {
    params: params,
    headers: {
      'Content-Type': 'text/csv,application/json',
    },
  });
  return response;
};

export { getBalanceTypeOperation, getBalanceTypeOperationDonwload };
