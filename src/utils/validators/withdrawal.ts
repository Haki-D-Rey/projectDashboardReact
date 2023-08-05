import { z } from 'zod';
import { SIZE_2MB } from '../constants/utils';

const confounderWithdrawal = z.object({
  name_services: z.string({
    invalid_type_error: 'El proveedor de la billetera debe ser una cadena de texto',
    required_error: 'El proveedor de la billetera es requerido',
  }),
  product_change: z.string({
    invalid_type_error: 'El proveedor de la billetera debe ser una cadena de texto',
    required_error: 'El proveedor de la billetera es requerido',
  }),
});

export const withdrawalSchema = z.object({
  wallet_address: z.string({
    invalid_type_error: 'La dirección de la billetera debe ser una cadena de texto',
    required_error: 'La dirección de la billetera es requerida',
  }),
  wallet_provider: z.string({
    invalid_type_error: 'El proveedor de la billetera debe ser una cadena de texto',
    required_error: 'El proveedor de la billetera es requerido',
  }),
  wallet_network: z.string({
    invalid_type_error: 'La red de la billetera debe ser una cadena de texto',
    required_error: 'La red de la billetera es requerida',
  }),
  amount: z
    .string({
      invalid_type_error: 'La cantidad debe ser una cadena de texto',
      required_error: 'La cantidad es requerida',
    })
    .refine((value) => parseFloat(value) > 0, {
      message: 'La cantidad debe ser mayor a cero',
      path: ['amount'],
    }),
  feed: z
    .string({
      invalid_type_error: 'La fuente debe ser una cadena de texto',
      required_error: 'La fuente es requerida',
    })
    .optional()
    .nullable(),
  withdrawal_type: z
    .string({
      invalid_type_error: 'El tipo de retiro debe ser una cadena de texto',
      required_error: 'El tipo de retiro es requerido',
    })
    .optional()
    .nullable(),
});

export const reisvestmentSchema = z.object({
  wallet_address: z.string({
    invalid_type_error: 'La dirección de la billetera debe ser una cadena de texto',
    required_error: 'La dirección de la billetera es requerida',
  }),
  wallet_provider: z.string({
    invalid_type_error: 'El proveedor de la billetera debe ser una cadena de texto',
    required_error: 'El proveedor de la billetera es requerido',
  }),
  wallet_network: z.string({
    invalid_type_error: 'La red de la billetera debe ser una cadena de texto',
    required_error: 'La red de la billetera es requerida',
  }),
  transaction_hash: z.string({
    invalid_type_error: 'El hash de la transacción debe ser una cadena de texto',
    required_error: 'El hash de la transacción es requerido',
  }),
  amount: z
    .string({
      invalid_type_error: 'La cantidad debe ser una cadena de texto',
      required_error: 'La cantidad es requerida',
    })
    .refine((value) => parseFloat(value) > 0, {
      message: 'La cantidad debe ser mayor a cero',
      path: ['amount'],
    }),
});

export const schemaWithDrawal = z
  .object({
    type: z.enum(['cofounder', 'normal']),
  })
  .and(
    z.union([
      z
        .object({ type: z.literal('cofounder') })
        .and(withdrawalSchema)
        .and(confounderWithdrawal),
      z.object({ type: z.literal('normal') }).and(withdrawalSchema),
    ])
  );
export type WithdrawalType = z.infer<typeof schemaWithDrawal>;
export type ReivestmentType = z.infer<typeof reisvestmentSchema>;
