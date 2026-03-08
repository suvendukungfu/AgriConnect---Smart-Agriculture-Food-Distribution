import { apiClient } from '../api';
import { User, UserRole } from '@agriconnect/types';

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export const authService = {
  async login(email: string, password?: string): Promise<AuthResponse> {
    // Simulated API Call
    const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },

  async signup(payload: Partial<User>): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/signup', payload);
    return data;
  },

  async verifyOtp(phone: string, otp: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/verify-otp', { phone, otp });
    return data;
  },

  async refreshTokens(refreshToken: string): Promise<Pick<AuthResponse, 'accessToken' | 'expiresAt'>> {
    const { data } = await apiClient.post('/auth/refresh', { refreshToken });
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { token, password });
  }
};
