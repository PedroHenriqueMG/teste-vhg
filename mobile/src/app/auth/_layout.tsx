import { Slot, useRouter } from 'expo-router';
import { View } from 'react-native';

import { useAuth } from '@/lib';

export default function UnauthorizedLayout() {
  const router = useRouter();
  const { status } = useAuth();

  if (status === 'signIn') {
    router.push('/auth/login');
  }

  return (
    <View className="flex-1 justify-center bg-white">
      <Slot />
    </View>
  );
}
