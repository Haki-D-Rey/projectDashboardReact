import { z } from 'zod';
import { SIZE_2MB } from '../constants/utils';

export const kitPlanFormTwoSchema = z.object({
  wallet_address: z.string().min(1, 'laWallet Address es requerida'),
  wallet_provider: z.string().min(1, 'El proveedor de la billetera debe tener al menos 1 caracter'),
  transaction_network: z.string().min(1, 'La red de transacción debe tener al menos 1 caracter'),
  invertion_money: z.string().min(1)
});

export const kitPlanFormThreeSchema = z.object({
  exchange: z.string().min(1, 'El hash de la transacción debe tener al menos 1 caracter'),
  transaction_network: z.string().min(1),
  inversion_type: z.string().min(3),
  amount_to_invest: z.number().min(1),
  hash_transaction: z.number().min(2)
});

export type KitPlanFormTwoType = z.infer<typeof kitPlanFormTwoSchema>;
export type KitPlanFormThreeType = z.infer<typeof kitPlanFormThreeSchema>;
