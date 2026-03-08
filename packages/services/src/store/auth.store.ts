import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, AuthSession } from '@agriconnect/types';

interface AuthState extends AuthSession {
  setSession: (session: Partial<AuthSession>) => void;
  clearSession: () => void;
  updateUser: (user: Partial<User>) => void;
  refreshSession: (data: { accessToken: string; sessionExpiry: number }) => void;
}

const initialState: AuthSession = {
  user: null,
  accessToken: null,
  refreshToken: null,
  sessionExpiry: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setSession: (session) => set((state) => ({ 
        ...state, 
        ...session, 
        isAuthenticated: !!(session.user || state.user) 
      })),
      
      clearSession: () => set(initialState),
      
      updateUser: (partialUser) => set((state) => ({
        ...state,
        user: state.user ? { ...state.user, ...partialUser } : null,
      })),

      refreshSession: ({ accessToken, sessionExpiry }) => set((state) => ({
        ...state,
        accessToken,
        sessionExpiry,
      })),
    }),
    {
      name: 'agriconnect-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
