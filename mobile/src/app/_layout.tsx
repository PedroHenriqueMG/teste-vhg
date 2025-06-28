import '../styles/global.css';

import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { APIProvider } from '@/api';
import { config } from '@/components/ui/gluestack-ui-provider/config';
import { hydrateAuth, loadSelectedTheme } from '@/lib';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'main',
};

async function hideSplash() {
  try {
    SplashScreen.preventAutoHideAsync();
    SplashScreen.setOptions({
      duration: 500,
      fade: true,
    });
    hydrateAuth();
    loadSelectedTheme();
  } finally {
    await SplashScreen.hideAsync();
    router.replace('/main');
  }
}

export default function RootLayout() {
  useEffect(() => {
    hideSplash();
  }, []);

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="main/index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? config.dark : config.light;

  return (
    <GestureHandlerRootView style={[styles.container, theme]}>
      <KeyboardProvider>
        <APIProvider>{children}</APIProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
