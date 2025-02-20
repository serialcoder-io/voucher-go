import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { immer } from 'zustand/middleware/immer';
import { StoreApi, UseBoundStore } from 'zustand'
import {Jwt} from "@/lib/definitions";


type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S,
) => {
    let store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (let k of Object.keys(store.getState())) {
        ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
    }

    return store
}


export type TokenName = 'access' | 'refresh';

interface User{
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    username: string;
}

interface AuthState {
    tokens: Jwt;
    setToken: (key: TokenName, token: string) => void;
    clearToken: () => void;
    user?: User | null;
}

export const useAuthStore = createSelectors(
    create<AuthState>()(
        immer((set) => ({
            tokens: {
                access: '',
                refresh: '',
            },
            user: null,

            setToken: async (key: TokenName, token: string) => {
                set((state) => {
                    state.tokens[key] = token;
                });
                await SecureStore.setItemAsync(key, token);
            },
            clearToken: async () => {
                set((state) => {
                    state.tokens.access = '';
                    state.tokens.refresh = '';
                });
                await SecureStore.deleteItemAsync('access_token');
                await SecureStore.deleteItemAsync('refresh_token');
            },
        }))
    )
)
