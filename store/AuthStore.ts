import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { immer } from 'zustand/middleware/immer';
import {Jwt, User} from "@/types";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {createSelectors} from "@/utils";
import {queryClient} from "@/lib/queryClient";


export type TokenName = 'access' | 'refresh';

interface AuthState {
    tokens: Jwt;
    setToken: (key: TokenName, token: string, keepMoSignedIn: boolean) => void;
    clearToken: () => void;
    user: User | null;
    initializeUser: (user: User, keepMeSignedIn: boolean) => void;
    signOut: () => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setEmail: (email: string) => void;
    setUsername: (username: string) => void;
    setFistOrLastName: (key: 'first_name' | 'last_name', newValue: string) => void;
    setUserFields: (fields: Partial<Pick<User, 'email' | 'username' | 'first_name' | 'last_name'>>) => void;
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
            setUserFields: (fields: Partial<Pick<User, 'email' | 'username' | 'first_name' | 'last_name'>>) => {
                set((state) => {
                    if (state.user) {
                        Object.assign(state.user, fields);
                    }
                });
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
        }))
    )
)
