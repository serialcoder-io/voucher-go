import React, { useState, useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { login } from "@/lib/services/auth";
import {LoginParams, loginResponse} from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/AuthStore";
import { Jwt } from "@/types";
import LoginForm from "@/components/ui/auth/loginForm";
import { useQuery } from "@tanstack/react-query";
import fetchUserData from "@/lib/services/user";
import { queryClient } from "@/lib/queryClient";
import Loader from "@/components/ui/loader";
import {ALERT_TYPE} from "react-native-alert-notification";
import {showDialog, showToast} from "@/utils";
import {useTheme} from "@/hooks/useTheme";

const LoginScreen = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checked, setChecked] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const router = useRouter();
    const {setToken, initializeUser, isAuthenticated, setIsAuthenticated} = useAuthStore();
    const accessToken = useAuthStore.use.tokens().access;
    const [userInitialized, setUserInitialized] = useState(false);
    const {theme} = useTheme();

    const fetchSignedInUserData = useCallback(async () => {
        return await fetchUserData(accessToken);
    }, [accessToken]);

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["userData"],
        queryFn: fetchSignedInUserData,
        enabled: isAuthenticated && !userInitialized,
    });

    const mutation = useMutation<loginResponse, Error, LoginParams>({
        mutationFn: login,
    });

    const handleSubmit = async () => {
        try {
            const result = await mutation.mutateAsync({ username, password });
            let dialogTitle = ""
            let dialogMsg = ""
            switch (result.http_status_code) {
                case 200:
                    setUsername("");
                    setPassword("");
                    const tokens = result.results as Jwt;
                    setToken("access", tokens.access, checked);
                    setToken("refresh", tokens.refresh, checked);
                    setIsAuthenticated(true);
                    break;
                case 401:
                    dialogTitle = "Invalid credentials"
                    dialogMsg = "invalid username and/or password"
                    showToast(dialogTitle, dialogMsg, ALERT_TYPE.DANGER, theme)
                    break;
                default:
                    dialogTitle = "Sorry"
                    dialogMsg = "Something went wrong, please try again later"
                    showToast(dialogTitle, dialogMsg, ALERT_TYPE.DANGER, theme)
            }
        } catch (error) {
            const errMsg = "Sorry, something went wrong, please try again later";
            showDialog("Sorry", errMsg, ALERT_TYPE.DANGER, () =>mutation.reset())
        }
    };

    useEffect(() => {
        if (isSuccess && isAuthenticated && data != null) {
            initializeUser(data, checked);
            setUserInitialized(true);
            setTimeout(() => {
                setChecked(false);
                queryClient.resetQueries({queryKey: "userData", exact: true}).then(
                    () =>router.push("/(tabs)")
                );
            }, 300);
        }
        if (error) {
            Alert.alert("Sorry, something went wrong, please try again later");
        }
    }, [isSuccess, data, isAuthenticated, initializeUser, router]);

    if (isLoading || (isAuthenticated && !userInitialized) || userInitialized) {
        return (
            <Loader />
        );
    }

    return (
        <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            checked={checked}
            setChecked={setChecked}
            secureTextEntry={secureTextEntry}
            setSecureTextEntry={setSecureTextEntry}
            loading={mutation.isPending}
            handleSubmit={handleSubmit}
        />
    );
};

export default LoginScreen;
