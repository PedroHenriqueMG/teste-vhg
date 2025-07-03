import { useRouter } from 'expo-router';
import { LogOut, Pencil, Trash2 } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/lib';
import { useAlertError } from '@/lib/hooks/use-alert-error';

export default function Settings() {
  const { signOut, userEmail } = useAuth();
  const router = useRouter();
  const showError = useAlertError();

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-10">
      <Text className="mb-4 text-2xl font-bold">Configuração</Text>

      <View className="mb-4 items-center">
        <Image
          source={require('@/assets/config-image.png')}
          style={{ width: 120, height: 120, resizeMode: 'contain' }}
        />
      </View>

      <View className="mb-6 gap-4">
        <View className="flex-row items-center rounded-xl bg-gray-50 px-4 py-3 shadow-sm">
          <View className="flex-1 flex-row gap-2">
            <Text className="text-base">Email:</Text>
            <Text className="text-base">{userEmail}</Text>
          </View>
          <TouchableOpacity>
            <Pencil size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      <Text className="mb-2 text-lg font-semibold">Ações</Text>
      <View className="mb-8 gap-4">
        <TouchableOpacity
          className="flex-row items-center rounded-xl bg-gray-50 px-4 py-3 shadow-sm"
          onPress={() => {}}
        >
          <Trash2 size={22} color={'#e11d48'} className="mr-2" />
          <Text className="ml-2 text-base font-medium text-red-700">
            Excluir conta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center rounded-xl bg-gray-50 px-4 py-3 shadow-sm"
          onPress={async () => {
            try {
              await signOut();
              router.push('/auth/login');
            } catch (error) {
              showError('Erro ao sair');
            }
          }}
        >
          <LogOut size={22} color="#222" className="mr-2" />
          <Text className="ml-2 text-base font-medium text-black">Sair</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute inset-x-0 bottom-0 flex-row items-center justify-between border-t border-gray-200 bg-white px-8 py-3">
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
