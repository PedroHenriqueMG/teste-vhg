import { useAuth } from '@/lib';
import { Slot, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function UnauthorizedLayout() {
  const router = useRouter();
  const { status } = useAuth();

  if (status === 'signIn') {
    router.push('/auth/login');
  }

  return (
    <View className="flex-1 bg-white justify-center">
      <Slot />
    </View>
  );
}
