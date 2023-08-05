import { z } from 'zod';

export const registerFormStepOneSchema = z.object({
  first_name: z
    .string({
      required_error: 'El nombre es requerido',
    })
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  last_name: z
    .string({
      required_error: 'El apellido es requerido',
    })
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
    personal_identification: z
    .string({
      required_error: 'La identificacion es requerida',
    })
    .min(10, 'La dirección debe tener al menos 10 caracteres'),
  country: z
    .string({
      required_error: 'El país es requerido',
    })
    .min(2, 'El país debe tener al menos 2 caracteres'),
  city: z
    .string({
      required_error: 'La ciudad es requerida',
    })
    .min(2, 'La ciudad debe tener al menos 2 caracteres'),
  zip_code: z
    .string({
      required_error: 'El código postal es requerido',
    })
    .min(2, 'El código postal debe tener al menos 2 caracteres'),
  address: z
    .string({
      required_error: 'La dirección es requerida',
    })
    .min(2, 'La dirección debe tener al menos 2 caracteres')
});

export const registerFormStepTwoSchema = z
  .object({
    username: z
      .string({
        required_error: 'El nombre de usuario es requerido',
      })
      .min(2, 'El nombre de usuario debe tener al menos 2 caracteres'),
    email: z
      .string({
        required_error: 'El email es requerido',
      })
      .email('El email no es válido'),
    phone_number: z
      .string({
        required_error: 'El número de teléfono es requerido',
      })
      .min(2, 'El número de teléfono debe tener al menos 2 caracteres'),
    password: z
      .string({
        required_error: 'La contraseña es requerida',
      })
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirm_password: z
      .string({
        required_error: 'La confirmación de la contraseña es requerida',
      })
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Las contraseñas no coinciden',
        path: ['confirm_password'],
      });
    }
  });


export const registerFormStepFourSchema = z.object({
  terms_and_conditions_accepted: z
    .boolean({
      required_error: 'Debes confirmar los términos y condiciones',
    })
    .refine((value) => value === true, {
      message: 'Debes confirmar los términos y condiciones',
    }),
  referral_code: z.string().optional(),
});

export type RegisterFormStepOneType = z.infer<typeof registerFormStepOneSchema>;
export type RegisterFormStepTwoType = z.infer<typeof registerFormStepTwoSchema>;
export type RegisterFormStepFourType = z.infer<typeof registerFormStepFourSchema>;
export type RegisterFormStepOneAndTwoType = RegisterFormStepOneType & RegisterFormStepTwoType;
