import React, {useState, useCallback, useEffect} from "react";
import {View, Alert} from "react-native";
import {Text} from "@rneui/themed";
import {useRouter} from "expo-router";
import {login, LoginParams, loginResponse} from "@/lib/services/auth";
import {useMutation} from "@tanstack/react-query";
import {useAuthStore} from "@/store/AuthStore";
import {Jwt} from "@/lib/definitions";
import LoginForm from "@/components/ui/auth/login-form";
import {useQuery} from "@tanstack/react-query";

const LoginScreen = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checked, setChecked] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();
    const setToken = useAuthStore.use.setToken()
    const accessToken = useAuthStore.use.tokens().access
    const user = useAuthStore.use.user();
    const initializeUser = useAuthStore.use.initializeUser()

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch("http://192.168.248.83:8000/vms/auth/users/me/",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const userData = await response.json();
            return userData;
        }catch(err) {
            console.log(err);
        }
    }, [user])

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["userData"],
        queryFn: fetchUserData,
        enabled: isAuthenticated,
    });

    const mutation = useMutation<loginResponse, Error, LoginParams>({
        mutationFn: login,
    }) ;

    const handleSubmit = async () => {
        try {
            const result = await mutation.mutateAsync({ username, password });
            switch (result.http_status_code) {
                case 200:
                    setUsername("")
                    setPassword("")
                    const tokens = result.results as Jwt
                    setToken('access', tokens.access);
                    setToken('refresh', tokens.refresh);
                    //router.push("/(tabs)");
                    setIsAuthenticated(true);
                    break;
                case 401:
                    Alert.alert('Invalid credentials', 'invalid usename and/or password');
                    break;
                default:
                    Alert.alert('Sorry, something went wrong, please try again later');
                    console.log(result.results)
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            initializeUser(data)
            console.log(data)
            router.push("/(tabs)");
        }
        if(error){
            console.log(error)
        }
    }, [isSuccess, data, initializeUser, router]); // Ajout des dépendances


    if(isLoading){
        return (
            <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 30}}>
                <Text>Fetching user_data...</Text>
            </View>
        )
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


