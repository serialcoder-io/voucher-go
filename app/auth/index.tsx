import React, {useState} from "react";
import {View, Image, TouchableOpacity, Alert, StyleSheet} from "react-native";
import {Text, CheckBox, Button} from "@rneui/themed";
import {useGlobalStyles} from "@/styles/global";
import {Link, useRouter} from "expo-router";
import PrimaryButton from "@/components/ui/primary-button";
import InputPassword from "@/components/ui/input-password";
import ParentContainer from "@/components/parent-container";
import CustomInputText from "@/components/ui/custom-inputText";
import {useTheme} from "@/hooks/useTheme";
import {commonColors} from "@/constants/Colors";
import {getstyles} from "./styles";
import {login, LoginParams, loginResponse} from "@/lib/services/auth";
import {useMutation} from "@tanstack/react-query";
import {useAuthStore} from "@/store/AuthStore";
import {Jwt} from "@/lib/definitions";
import LoginForm from "@/components/ui/auth/login-form";
import {Avatar} from "@rneui/base";

const LoginScreen = () => {
    const {theme} = useTheme();
    const styles = getstyles(theme)
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checked, setChecked] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isStoredData, setIsStoredData] = useState<boolean>(true);
    const router = useRouter();
    const setToken = useAuthStore.use.setToken()

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
                    router.push("/auth/redirect");
                    break;
                case 401:
                    Alert.alert('Invalid credentials', 'invalid usename and/or password');
                    break;
                default:
                    console.log(result.results)
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    if(isStoredData){
        return (
            <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 30}}>
                <View style={{width:'100%', flex: 0.6, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: 45,}}>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: 15}}>
                        <Avatar
                            size={120}
                            rounded
                            title="A"
                            titleStyle={{color: theme.textPrimary}}
                            containerStyle={{ backgroundColor: theme.backgroundSecondary }}
                        />
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Omar</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: 15, width: "100%"}}>
                        <PrimaryButton
                            title="Se connecter"
                            actionOnPress={()=>console.log('logged in using stored date')}
                        />
                        <TouchableOpacity onPress={()=> setIsStoredData(false)}>
                            <Text style={{fontSize: 16, fontWeight: '700', color: theme.textSecondary}}>Se connecter à un autre compte</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: "100%"}}>
                    <Button
                        title="create account"
                        type="outline"
                        titleStyle={{color: commonColors.primaryColor}}
                        buttonStyle={{width: '100%', borderColor: commonColors.primaryColor, borderRadius: 10}}
                        containerStyle={{width: '100%'}}
                    />
                </View>
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


