import api from '../lib/api';
import { SignupInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../lib/schemas';

export const authService = {
  signup: async (data: SignupInput) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginInput) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordInput) => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordInput & { token: string }) => {
    const response = await api.post('/auth/reset-password', {
      token: data.token,
      password: data.password,
    });
    return response.data;
  },
};

