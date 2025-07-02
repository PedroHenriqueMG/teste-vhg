import '../styles/global.css';

import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { APIProvider } from '@/api';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="profile" options={{ title: 'Perfil' }} />
        <Stack.Screen name="settings" options={{ title: 'Configurações' }} />
        <Stack.Screen name="notes" options={{ title: 'Notas' }} />
        <Stack.Screen name="notes/create" options={{ title: 'Nova Nota' }} />
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
        <GluestackUIProvider>
          <APIProvider>{children}</APIProvider>
        </GluestackUIProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
