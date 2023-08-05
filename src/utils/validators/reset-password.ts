import { z } from 'zod';

export const resetPasswordStepOneSchema = z.object({
  email: z
    .string({
      required_error: 'El email es requerido',
    })
    .email('El email no es válido'),
});

export const resetPasswordStepTwoSchema = z.object({
  code: z
    .string({
      required_error: 'El código es requerido',
    })
    .min(8, 'El código debe tener 8 caracteres'),
});

export const resetPasswordStepThreeSchema = z
  .object({
    password: z
      .string({
        required_error: 'La contraseña es requerida',
      })
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirm_password: z
      .string({
        required_error: 'La confirmación de la contraseña es requerida',
      })
      .min(8, 'La confirmación de la contraseña debe tener al menos 8 caracteres'),
  })
  .superRefine((data) => {
    if (data.password !== data.confirm_password) {
      return {
        path: ['confirm_password'],
        message: 'Las contraseñas no coinciden',
      };
    }
  });

export type ResetPasswordStepOneType = z.infer<typeof resetPasswordStepOneSchema>;
export type ResetPasswordStepTwoType = z.infer<typeof resetPasswordStepTwoSchema>;
export type ResetPasswordStepThreeType = z.infer<typeof resetPasswordStepThreeSchema>;
