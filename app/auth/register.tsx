// 📱 React Native Signup Screen without ParentContainer, with custom gradient background and styles
import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation } from "@tanstack/react-query";
import { ALERT_TYPE } from "react-native-alert-notification";

// Components & Hooks
import PrimaryButton from "@/components/ui/primaryButton";
import InputPassword from "@/components/ui/inputPassword";
import CustomInputText from "@/components/ui/customInputText";
import { showDialog, showToast } from "@/utils";
import { allRequiredFieldsFilled } from "@/validations";
import { useShopStore } from "@/store/shop";
import { useTheme } from '@/hooks/useTheme';
import { Link } from "expo-router";
import { commonColors } from "@/constants/Colors";
import { validateEmail, validatePassword } from "@/validations/auth.validations";
import { SignupParams, signupResponse } from "@/types/auth.types";
import { signup } from '@/lib/services/auth';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import NoInternetScreen from '@/components/ui/NoInternet';
import ThemedStatusBar from '@/components/statusBar';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { theme } = useTheme();
  const shop = useShopStore.use.shop();
  const [isConnected, checkNetwork] = useNetworkStatus();
  const allFields = [username, email, password, confirmPassword];

  const mutation = useMutation<signupResponse, Error, SignupParams>({
    mutationFn: signup,
  });

  const handleSignup = async () => {
    const isEmailValid = validateEmail(email, mutation.reset);
    const isPasswordValid = validatePassword(password, confirmPassword, mutation.reset);

    if (!isEmailValid || !isPasswordValid) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    const company = shop?.company?.id;
    if (company !== undefined) {
      try {
        const result = await mutation.mutateAsync({ username, email, password, company, signal: controller.signal });
        clearTimeout(timeout);
        if (result.status_code === 201) {
          showDialog('Registered', 'Your account has been created successfully.', ALERT_TYPE.SUCCESS, () => mutation.reset());
        } else {
          showDialog("Sorry", result.details, ALERT_TYPE.DANGER, () => mutation.reset());
        }
      } catch (error) {
        clearTimeout(timeout);
        if (error instanceof Error && error.name === "AbortError") {
          showToast("Timeout", "Check your connection and try again.", ALERT_TYPE.DANGER, theme);
        } else {
          showDialog("Error", "Something went wrong.", ALERT_TYPE.DANGER, () => mutation.reset());
        }
      }
    } else {
      clearTimeout(timeout);
      showDialog("Company not exist", "Please register a shop first.", ALERT_TYPE.DANGER, () => mutation.reset());
    }
  };

  if (isConnected === false) return <NoInternetScreen onRetry={checkNetwork} />;

  return (
    <LinearGradient colors={[commonColors.primaryColor, "#772bc2"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={commonColors.primaryColor}
            />
          <Text style={styles.title}>Welcome 👋</Text>
          <Text style={styles.subtitle}>Create an acount to continue</Text>

          <CustomInputText
            value={username}
            onChangeText={setUsername}
            iconName="user"
            placeholder="Nom d'utilisateur"
          />

          <CustomInputText
            value={email}
            onChangeText={setEmail}
            iconName="mail"
            placeholder="Email"
          />

          <InputPassword
            placeholder="Mot de passe"
            secureTextEntry={secureTextEntry}
            onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
            value={password}
            onChangeText={setPassword}
          />

          <InputPassword
            placeholder="Confirme le mot de passe"
            secureTextEntry={secureTextEntry}
            onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <PrimaryButton
                disabled={!allRequiredFieldsFilled(allFields)}
                title="S'inscrire"
                loading={mutation.isPending}
                actionOnPress={handleSignup}
                width='95%'
            />
          </View>

            <Link href="/auth" style={styles.linkText}>
                Already a member? <Text style={styles.linkHighlight}>Sign in</Text>
            </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 40,
    elevation: 9,
  },
  innerContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 10,
    borderRadius: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginBottom: 25,
  },
  linkText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  linkHighlight: {
    color: '#add8ff',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
