import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { immer } from 'zustand/middleware/immer';
import { StoreApi, UseBoundStore } from 'zustand'
import {Jwt, User} from "@/lib/definitions";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";


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
            initializeUser: async (userdata: User, keepSignedIn: boolean = false) => {
                set((state)=>{
                    state.user = userdata || null;
                });
                if (keepSignedIn) {
                    await asyncStorage.setItem('username', userdata.username);
                }
            },
            signOut: async () => {
                try {
                    set((state) => {
                        state.clearToken();
                        state.user = null;
                    });
                    await asyncStorage.removeItem('username');
                    // Si tu utilises React Router ou un autre système de navigation, redirige l'utilisateur
                    // router.push("/auth"); // Exemple avec React Router
                } catch (error) {
                    console.error("Error signing out:", error);
                }
            },
            loadStoredToekns: async () => {
                try {
                    const storedAccess = await SecureStore.getItemAsync('access');
                    const storedRefresh = await SecureStore.getItemAsync('refresh');

                    if (storedAccess && storedRefresh) {
                        set((state) => {
                            state.tokens.access = storedAccess;
                            state.tokens.refresh = storedRefresh;
                        });
                    }

                } catch (error) {
                    console.error('Error loading stored data:', error);
                }
            },
            setUsername: async (username: string, keepSignedIn: boolean) => {
                set((state) =>{
                    if(state.user){
                        state.user.username = username;
                    }
                })
                const storedUserName = await SecureStore.getItemAsync('username');
                if (storedUserName || keepSignedIn) {
                    await asyncStorage.setItem('username', username);
                }
            },
            setEmail: (email: string) => {
                set((state) =>{
                    if(state.user){
                        state.user.email = email;
                    }
                })
            },
            setFistOrLastName: (key: 'first_name' | 'last_name', newValue: string) => {
                set((state) =>{
                    if(state.user && state.user[key]){
                        state.user[key] = newValue;
                    }
                })
            },
            setToken: async (key: TokenName, token: string, keepSignedIn: boolean = false) => {
                try {
                    set((state) => {
                        state.tokens[key] = token;
                    });
                    const storedToken = await SecureStore.getItemAsync(key);
                    if (keepSignedIn || !storedToken) {
                        await SecureStore.setItemAsync(key, token);
                    }
                } catch (error) {
                    console.error(`Error saving token ${key}:`, error);
                }
            },
            clearToken: async () => {
                try {
                    set((state) => {
                        state.tokens.access = '';
                        state.tokens.refresh = '';
                    });
                    await SecureStore.deleteItemAsync('access');
                    await SecureStore.deleteItemAsync('refresh');
                } catch (error) {
                    console.error("Error clearing tokens:", error);
                }
            },
            cleanStore: async () => {
                try {
                    set((state) => {
                        state.clearToken();
                    });
                    await asyncStorage.removeItem('username');
                } catch (error) {
                    console.error('Error while cleaning tokens and user data:', error);
                }
            }
        }))
    )
)
