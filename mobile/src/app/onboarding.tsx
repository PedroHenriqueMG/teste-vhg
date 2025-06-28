// import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

// import { useIsFirstTime } from '@/lib/hooks';

export default function Onboarding() {
  // const [_, setIsFirstTime] = useIsFirstTime();
  // const router = useRouter();
  return (
    <View className="flex h-full items-center  justify-center">
      <SafeAreaView className="mt-6">
        <Text className="text-center text-3xl font-bold">
          Welcome to OBytes!
        </Text>
      </SafeAreaView>
    </View>
  );
}
