import { z } from 'zod';

// Auth DTOs
export const SignupDTO = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginDTO = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const ForgotPasswordDTO = z.object({
  email: z.string().email('Invalid email format'),
});

export const ResetPasswordDTO = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Todo DTOs
export const CreateTodoDTO = z.object({
  text: z.string().min(1, 'Todo text is required').trim(),
});

export const UpdateTodoDTO = z.object({
  text: z.string().min(1, 'Todo text is required').trim(),
});

export const ToggleTodoDTO = z.object({
  completed: z.boolean(),
});

export type SignupInput = z.infer<typeof SignupDTO>;
export type LoginInput = z.infer<typeof LoginDTO>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordDTO>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordDTO>;
export type CreateTodoInput = z.infer<typeof CreateTodoDTO>;
export type UpdateTodoInput = z.infer<typeof UpdateTodoDTO>;
export type ToggleTodoInput = z.infer<typeof ToggleTodoDTO>;

