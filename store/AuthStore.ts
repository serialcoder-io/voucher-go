import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { immer } from 'zustand/middleware/immer';

type TokenName = 'access_token' | 'refresh_token';

type Jwt = {
    access_token: string;
    refresh_token: string;
};

interface AuthState {
    tokens: Jwt;
    setToken: (key: TokenName, token: string) => void;
    clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
    immer((set) => ({
        tokens: {
            access_token: '',
            refresh_token: '',
        },
        setToken: async (key: TokenName, token: string) => {
            set((state) => {
                state.tokens[key] = token;
            });
            await SecureStore.setItemAsync(key, token);
        },
        clearToken: async () => {
            set((state) => {
                state.tokens.access_token = '';
                state.tokens.refresh_token = '';
            });
            await SecureStore.deleteItemAsync('access_token');
            await SecureStore.deleteItemAsync('refresh_token');
        },
    }))
);
