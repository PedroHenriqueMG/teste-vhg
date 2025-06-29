import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function UnauthorizedLayout() {
  return (
    <View className="flex-1 bg-white justify-center">
      <Slot />
    </View>
  );
}
