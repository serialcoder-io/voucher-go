import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { immer } from 'zustand/middleware/immer';
import {Jwt, User} from "@/lib/definitions";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {createSelectors} from "@/lib/utils";
import {queryClient} from "@/lib/queryClient";


export type TokenName = 'access' | 'refresh';

interface AuthState {
    tokens: Jwt;
    setToken: (key: TokenName, token: string, keepMoSignedIn: boolean) => void;
    clearToken: () => void;
    loadStoredTokens: () => void;
    user: User | null;
    initializeUser: (user: User, keepMeSignedIn: boolean) => void;
    signOut: () => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = createSelectors(
    create<AuthState>()(
        immer((set) => ({
            tokens: {
                access: '',
                refresh: '',
            },
            user: null,
            isAuthenticated: false,
            setIsAuthenticated: (value: boolean) => set((state) => {
                state.isAuthenticated = value;
            }),
            initializeUser: async (user: User, keepMeSignedIn: boolean) => {
                set((state)=>{
                    state.user = user;
                });
                if (user !== null && keepMeSignedIn) {
                    if (user.last_login != null) {
                        await asyncStorage.setItem("last_login", user.last_login);
                    }
                }
            },
            signOut: async () => {
                try {
                    set((state) => {
                        state.clearToken();
                        state.user = null;
                        state.isAuthenticated = false;
                    });
                    await asyncStorage.removeItem('last_login');
                    queryClient.clear();
                } catch (error) {
                    console.error("Error signing out:", error);
                }
            },
            loadStoredTokens: async () => {
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
            setUsername: async (username: string) => {
                set((state) =>{
                    if(state.user){
                        state.user.username = username;
                    }
                })
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
            setLastLogin: (dateTime: string) => {
                set((state) =>{
                    if(state.user){
                        state.user.last_login = dateTime;
                    }
                })
            },
            setToken: async (key: TokenName, token: string, keepSignedIn: boolean = false) => {
                try {
                    set((state) => {
                        state.tokens[key] = token;
                    });
                    //const storedToken = await SecureStore.getItemAsync(key);
                    if (keepSignedIn) {
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
                } catch (error) {
                    console.error('Error while cleaning tokens and user data:', error);
                }
            }
        }))
    )
)
