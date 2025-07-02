import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';
import { LoginFormData } from '@/app/auth/login';
import { client } from '@/api';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  userEmail: string | null;
  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => Promise<void>;
}

const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch (error) {
      console.error('Error getting item from SecureStore:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.error('Error setting item in SecureStore:', error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.error('Error removing item from SecureStore:', error);
    }
  },
};

const _useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      status: 'idle',
      token: null,
      userEmail: null,

      signIn: async (data) => {
        try {
          const response = await client.post('/signIn', data);
          const token = response.data.access_token;
          const userEmail = response.data.user.props.email;

          await setToken(token);
          set({ status: 'signIn', token, userEmail });
        } catch (error) {
          console.error('Error signing in:', error);
          throw error;
        }
      },

      signOut: async () => {
        try {
          await removeToken();
          set({ status: 'signOut', token: null, userEmail: null });
        } catch (error) {
          console.error('Error signing out:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        token: state.token,
        status: state.status,
        userEmail: state.userEmail,
      }),
    }
  )
);

export const useAuth = createSelectors(_useAuth);
