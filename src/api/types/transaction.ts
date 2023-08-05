export interface IMutationTransactionArgs {
  wallet_address: string;
  voucher_screenshot: string;
  wallet_provider: string;
  transaction_hash: string;
  description: string;
  amount: number;
  transaction_type: string;
  user: number;
}

export interface IResponseTransaction {
  id: number;
}

export interface IKitPlan {
  name: string;
  price: string;
  type: string;
  benefits: string[];
}

export interface IResponseKitPlan {
  pk: number;
  title: string;
  kit_plan_category: string;
  short_description: string;
  details: string[];
  price: string;
  business_volume: string;
  earnings_cap: string;
  allow_repurchase: boolean;
  can_be_upgraded: boolean;
}

export interface IQueryGetKitPlanArgs {
  id_user: string;
}

export interface IResponseGetKitPlans {
  id: number;
  selected_plan: number;
  transaction_hash: string;
  created_at: string;
  expiration: string;
  user: number;
  credentials: [];
}

export interface IQueryGetTradingPlanArgs {
  id: string;
}

export interface IResponseGetTradingPlans {
  id: number;
  trading_amount: string;
  transaction_hash: string;
  created_at: string;
  user: number;
}

export interface IQueryGetTradingRevenueHistoryArgs {
  id: string;
}

export interface IResponseGetTradingRevenueHistory {
  date: string;
  traded_amount: number;
  percentage: number;
  traded_revenue: number;
}

export interface IQueryGetPlansBalanceArgs {
  id: string;
}

export interface IResponseGetPlansBalance {
  date: string;
  balance: number;
}

export interface IResponseTransactionALL {
  count: number;
  results: {
    wallet_address: string;
    wallet_provider: string;
    other_wallet_provider: string;
    wallet_network: string;
    source_of_profit: string;
    transaction_hash: string | null;
    confirmation_screenshot: string | null;
    transaction_status: number;
    amount: string;
    fee_amount: string;
    amount_after_fee: string;
    created_at: string | Date;
    transaction_date: string | Date;
  }[];
}

export interface IQueryBalanceTypeOperation {
  object_date?: string | null;
  page_size?: '10' | string;
  page?: string;
  ordering?: string;
  operation_area: 'general' | 'kitplan' | 'trading' | 'cofounder' | 'withdrawal' |'transaction';
}

export type ResultKeysMap = {
  general: {
    _key1: any;
  };
  kitplan: {
    object_date: string;
    description: string;
    amount: string;
    related_balance_post_operation: string;
  };
  trading: {
    object_date: string;
    description: string;
    amount: string;
    related_balance_post_operation: string;
  };
  cofounder: {
    object_date: string;
    trimester: string;
    product: string;
    description: string;
    amount: string;
    related_balance_post_operation: string;
  };
  withdrawal: {
    transaction_date: string;
    amount: string;
    transaction_hash: string;
    source_of_profit: string;
  }
  transaction: {
    transaction_date: string;
    description: string;
    amount: string;
    wallet_network: string;
    status: string;
  }
};

export type IBalanceTypeWithMappedResultKeys = ResultKeysMap[IQueryBalanceTypeOperation['operation_area']];

export interface IResponseBalanceTypeOperation {
  count: number;
  next: string;
  previous: string;
  results: IBalanceTypeWithMappedResultKeys[];
}
