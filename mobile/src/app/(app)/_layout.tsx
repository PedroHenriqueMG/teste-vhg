import { Slot, useRouter } from 'expo-router';
import { View, TouchableOpacity, Text } from 'react-native';

export default function AuthorizedLayout() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <Slot />
      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 flex-row bg-white py-3 px-8 justify-between items-center border-t border-gray-200">
        <TouchableOpacity className="items-center" onPress={() => {}}>
          <Text className="text-xl">💬</Text>
          <Text className="text-xs text-gray-500">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center"
          onPress={() => router.push('/main')}
        >
          <Text className="text-xl font-bold text-black">🏠</Text>
          <Text className="text-xs font-bold text-black">Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center"
          onPress={() => router.push('/settings')}
        >
          <Text className="text-xl">⚙️</Text>
          <Text className="text-xs text-gray-500">Configuração</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
