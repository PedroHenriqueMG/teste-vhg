import { Text, View, Image, TouchableOpacity } from 'react-native';
import { LogOut, Trash2, Pencil } from 'lucide-react-native';
import { useAuth } from '@/lib';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const { signOut, userEmail } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white pt-10 px-4">
      <Text className="text-2xl font-bold mb-4">Configuração</Text>

      <View className="items-center mb-4">
        <Image
          source={require('@/assets/config-image.png')}
          style={{ width: 120, height: 120, resizeMode: 'contain' }}
        />
      </View>

      <View className="gap-4 mb-6">
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 shadow-sm">
          <View className="flex-1 flex-row gap-2">
            <Text className="text-base">Email:</Text>
            <Text className="text-base">{userEmail}</Text>
          </View>
          <TouchableOpacity>
            <Pencil size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-lg font-semibold mb-2">Ações</Text>
      <View className="gap-4 mb-8">
        <TouchableOpacity
          className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 shadow-sm"
          onPress={() => {}}
        >
          <Trash2 size={22} color={'#e11d48'} className="mr-2" />
          <Text className="text-base text-red-700 font-medium ml-2">
            Excluir conta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 shadow-sm"
          onPress={async () => {
            await signOut();
            router.push('/auth/login');
          }}
        >
          <LogOut size={22} color="#222" className="mr-2" />
          <Text className="text-base text-black font-medium ml-2">Sair</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-0 left-0 right-0 flex-row bg-white py-3 px-8 justify-between items-center border-t border-gray-200">
        <TouchableOpacity className="items-center" onPress={() => {}}>
          <Text className="text-xl">💬</Text>
          <Text className="text-xs text-gray-500">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={() => {}}>
          <Text className="text-xl">🏠</Text>
          <Text className="text-xs text-gray-500">Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={() => {}}>
          <Text className="text-xl font-bold text-black">⚙️</Text>
          <Text className="text-xs font-bold text-black">Configuração</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
