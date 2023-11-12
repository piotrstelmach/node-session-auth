import z from 'zod';

export const userRegisterInputSchema = z.object({
  name: z.string().min(3).max(25),
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export const userLoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export type UserLoginInput = z.infer<typeof userLoginInputSchema>;

export type UserRegisterInput = z.infer<typeof userRegisterInputSchema>;
