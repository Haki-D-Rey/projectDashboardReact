export interface IResponseCreateWithdrawal {
  id: number;
}

export interface IMutationCreateWithdrawalArgs {
  wallet_address: string;
  wallet_provider: string;
  wallet_network: string;
  transaction_hash?: string;
  voucher_screenshot?: string;
  confirmation_screenshot?: string;
  amount: string;
  transaction_status?: number | string;
  created_at?: string;
  user?: number | string;
  transaction_date?: string;
}
