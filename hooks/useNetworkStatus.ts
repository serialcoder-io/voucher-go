import { useEffect, useState } from "react";
import * as Network from 'expo-network';

export function useNetworkStatus(): [boolean | null, () => Promise<void>] {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const checkNetwork = async () => {
    const state = await Network.getNetworkStateAsync();
    setIsConnected(!!state.isConnected);
  };

  useEffect(() => {
    checkNetwork();

    const subscription = Network.addNetworkStateListener((state) => {
      setIsConnected(!!state.isConnected);
    });

    return () => subscription.remove();
  }, []);

  return [isConnected, checkNetwork];
}
