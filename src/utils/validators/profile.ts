import { z } from 'zod';
import { SIZE_2MB } from '../constants/utils';

export const profileSchema = z.object({
  username: z.string().min(5, 'El nuevo nombre de usuario debe tener al menos 5 caracteres.'),
  phone_number: z.string().min(5, 'El número de teléfono debe tener al menos 5 numeros.'),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  email: z
    .string({
      required_error: 'El email es requerido',
      invalid_type_error: 'El email debe ser una cadena de texto',
    })
    .email('El email no es válido'),
  zip_code: z
    .string({
      required_error: 'El código postal es requerido',
    })
    .min(2, 'El código postal debe tener al menos 2 caracteres'),
  image:
    typeof window === 'undefined'
      ? z.null()
      : z
          .instanceof(File)
          .refine((value) => value.size <= SIZE_2MB, {
            message: 'El tamaño del archivo no puede ser mayor a 2MB',
          })
          .refine((value) => value.type === 'image/jpeg' || value.type === 'image/png', {
            message: 'El archivo debe ser una imagen',
          }),
});

export const passwordSchema = z
  .object({
    old_password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    new_password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    password_confirmation: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  .superRefine((data, ctx) => {
    if (data.new_password !== data.password_confirmation) {
      return ctx.addIssue({
        path: ['password_confirmation'],
        code: z.ZodIssueCode.custom,
        message: 'Las contraseñas nuevas no coinciden',
      });
    }

    if (data.old_password === data.new_password) {
      return ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message: 'La nueva contraseña debe ser diferente a la anterior',
      });
    }
  });

export const confirmPasswordSchema = z.object({
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type ProfileType = z.infer<typeof profileSchema>;
export type PasswordType = z.infer<typeof passwordSchema>;
export type ConfirmPasswordType = z.infer<typeof confirmPasswordSchema>;
