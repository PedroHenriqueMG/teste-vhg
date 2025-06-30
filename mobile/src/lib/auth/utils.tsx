import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export type TokenType = string;

export const getToken = async (): Promise<TokenType | null> => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error getting token from SecureStore:', error);
    return null;
  }
};

export const setToken = async (token: TokenType): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting token in SecureStore:', error);
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token from SecureStore:', error);
  }
};
