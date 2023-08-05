import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z.string().email('El email no es válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  remember: z.boolean().optional(),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
