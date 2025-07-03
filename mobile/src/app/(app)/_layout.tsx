import { Slot, usePathname, useRouter } from 'expo-router';
import { HousePlus, MessageSquarePlus, Settings } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/lib';

export default function AuthorizedLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useAuth();

  if (status !== 'signIn') {
    router.push('/auth/login');
  }

  const isActive = (route: string) => pathname === route;

  return (
    <View className="flex-1 bg-white">
      <Slot />
      <View className="absolute inset-x-0 bottom-4 flex-row items-center justify-between border-t border-gray-200 bg-white px-8 py-3">
        <TouchableOpacity
          className="items-center"
          onPress={() => router.push('/chat')}
        >
          <MessageSquarePlus
            size={20}
            color={isActive('/chat') ? '#000' : '#6b7280'}
          />
          <Text
            className={`text-xs ${isActive('/chat') ? 'font-bold text-black' : 'text-gray-500'}`}
          >
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center"
          onPress={() => router.push('/main')}
        >
          <HousePlus size={20} color={isActive('/main') ? '#000' : '#6b7280'} />
          <Text
            className={`text-xs ${isActive('/main') ? 'font-bold text-black' : 'text-gray-500'}`}
          >
            Inicio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center"
          onPress={() => router.push('/settings')}
        >
          <Settings
            size={20}
            color={isActive('/settings') ? '#000' : '#6b7280'}
          />
          <Text
            className={`text-xs ${isActive('/settings') ? 'font-bold text-black' : 'text-gray-500'}`}
          >
            Configuração
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
