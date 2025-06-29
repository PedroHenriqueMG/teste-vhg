import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button, ButtonText } from '@/components/ui/button';

export default function Profile() {
  return (
    <View className="flex-1 p-6">
      <View className="space-y-6">
        {/* Header */}
        <View className="items-center space-y-4">
          <View className="w-24 h-24 bg-muted rounded-full items-center justify-center">
            <Text className="text-2xl">👤</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold">João Silva</Text>
            <Text className="text-muted-foreground">joao@email.com</Text>
          </View>
        </View>

        {/* Profile Info */}
        <View className="space-y-4">
          <View className="bg-card p-4 rounded-lg">
            <Text className="font-semibold mb-2">Informações Pessoais</Text>
            <Text className="text-muted-foreground">Nome: João Silva</Text>
            <Text className="text-muted-foreground">Email: joao@email.com</Text>
            <Text className="text-muted-foreground">Membro desde: Janeiro 2024</Text>
          </View>

          <View className="bg-card p-4 rounded-lg">
            <Text className="font-semibold mb-2">Estatísticas</Text>
            <Text className="text-muted-foreground">Notas criadas: 15</Text>
            <Text className="text-muted-foreground">Último acesso: Hoje</Text>
          </View>
        </View>

        {/* Actions */}
        <View className="space-y-3">
          <Button 
            variant="outline" 
            size="lg"
            onPress={() => router.push('/settings')}
          >
            <ButtonText>Configurações</ButtonText>
          </Button>

          <Button 
            variant="outline" 
            size="lg"
            onPress={() => router.push('/notes')}
          >
            <ButtonText>Minhas Notas</ButtonText>
          </Button>

          <Button 
            variant="destructive" 
            size="lg"
            onPress={() => router.push('/auth/login')}
          >
            <ButtonText>Sair</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
} 