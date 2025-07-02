import { useAuth } from '@/lib';
import { Slot, useRouter, usePathname } from 'expo-router';
import {
  House,
  HousePlus,
  MessageSquarePlus,
  Settings,
} from 'lucide-react-native';
import { View, TouchableOpacity, Text } from 'react-native';

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
      <View className="absolute bottom-4 left-0 right-0 flex-row bg-white py-3 px-8 justify-between items-center border-t border-gray-200">
        <TouchableOpacity
          className="items-center"
          onPress={() => router.push('/chat')}
        >
          <MessageSquarePlus
            size={20}
            color={isActive('/chat') ? '#000' : '#6b7280'}
          />
          <Text
            className={`text-xs ${isActive('/chat') ? 'text-black font-bold' : 'text-gray-500'}`}
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
            className={`text-xs ${isActive('/main') ? 'text-black font-bold' : 'text-gray-500'}`}
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
            className={`text-xs ${isActive('/settings') ? 'text-black font-bold' : 'text-gray-500'}`}
          >
            Configuração
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
