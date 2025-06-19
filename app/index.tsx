import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { useTheme } from '@/hooks/useTheme';
import { useGlobalStyles } from '@/styles';
import { Link, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import asyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';
import { useAuthStore } from '@/store/AuthStore';
import * as SecureStore from 'expo-secure-store';
import { useShopStore } from '@/store/shop';
import { getHomeScreenStyles } from '@/styles';
import { showToast } from '@/utils';
import { ALERT_TYPE } from 'react-native-alert-notification';
import NoInternetScreen from '@/components/ui/NoInternet';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { commonColors } from '@/constants/Colors';

SplashScreen.preventAutoHideAsync();

function PinLoginScreen() {
  const [pin, setPin] = useState('');
  const { theme } = useTheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const setToken = useAuthStore.use.setToken();
  const setIsAuthenticated = useAuthStore.use.setIsAuthenticated();
  const setShop = useShopStore.use.setShop();
  const router = useRouter();
  const styles = getHomeScreenStyles(theme);
  const globalStyles = useGlobalStyles();
  const [isConnected, checkNetwork] = useNetworkStatus();

  const handleValidatePin = async () => {
    const accessCode = await SecureStore.getItemAsync('accessCode');
    if (pin.length !== 4) {
      showToast('Code PIN requis', 'Veuillez entrer un code PIN à 4 chiffres.', ALERT_TYPE.WARNING, theme);
      return;
    }
    if (pin === accessCode) {
      router.push('/auth');
    } else {
      showToast('Accès refusé', 'Le code PIN est incorrect.', ALERT_TYPE.DANGER, theme);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        const firstLaunch = (await asyncStorage.getItem('first_launch')) || '0';
        const shopJson = await asyncStorage.getItem('shop');
        if (parseInt(firstLaunch) === 0 || shopJson === null) {
          router.push('/firstLaunch');
          return;
        }
        setShop(JSON.parse(shopJson));
        const accessToken = await SecureStore.getItemAsync('access');
        const refreshToken = await SecureStore.getItemAsync('refresh');
        const userLastLogin = await asyncStorage.getItem('last_login');
        const lastLogin = userLastLogin ? new Date(userLastLogin) : new Date();
        const currentDate = new Date();
        const differencesInDays = (currentDate.getTime() - lastLogin.getTime()) / (1000 * 3600 * 24);
        if (differencesInDays < 7 && accessToken && refreshToken) {
          setToken('access', accessToken, true);
          setToken('refresh', refreshToken, true);
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;
  if (isConnected === false) return <NoInternetScreen onRetry={checkNetwork} />;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* Logo */}
      <Image source={require('@/assets/images/adaptive-icon.png')} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Pin</Text>
      <Text style={styles.subtitle}>Accéder à l’application avec votre code PIN</Text>

      {/* Pin Input */}
      <View style={styles.pinContainer}>
        <Input
          secureTextEntry
          leftIcon={{ type: 'feather', name: 'lock', color: '#4c8bf5' }}
          maxLength={4}
          keyboardType="number-pad"
          inputContainerStyle={globalStyles.inputContainer}
          inputStyle={styles.textInput}
          value={pin}
          onChangeText={setPin}
          placeholder="••••"
        />
      </View>

      {/* Validate Button */}
      <Button
        title="Valider"
        onPress={handleValidatePin}
        containerStyle={{ width: '90%', alignSelf: 'center', marginTop: 20 }}
        buttonStyle={{
          backgroundColor: commonColors.primaryColor,
          borderRadius: 12,
          paddingVertical: 12,
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
      />

      {/* Forgot Pin */}
      <View style={{ marginTop: 20 }}>
        <Link href="/auth/resetPassword" style={[styles.forgotPin, { textAlign: 'center' }]}>
          J’ai oublié mon code PIN
        </Link>
      </View>
    </View>
  );
}

export default PinLoginScreen;



