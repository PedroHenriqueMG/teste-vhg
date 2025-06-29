import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button, ButtonText } from '@/components/ui/button';

export default function Notes() {
  const mockNotes = [
    { id: 1, title: 'Reunião com cliente', content: 'Discussão sobre o projeto...', date: '2024-01-15' },
    { id: 2, title: 'Ideias para o app', content: 'Funcionalidades principais...', date: '2024-01-14' },
    { id: 3, title: 'Lista de compras', content: 'Leite, pão, ovos...', date: '2024-01-13' },
  ];

  return (
    <View className="flex-1 p-6">
      <View className="space-y-6">
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold">Minhas Notas</Text>
          <Button 
            variant="outline" 
            size="sm"
            onPress={() => router.push('/notes/create')}
          >
            <ButtonText>Nova Nota</ButtonText>
          </Button>
        </View>

        {/* Notes List */}
        <View className="space-y-3">
          {mockNotes.map((note) => (
            <View key={note.id} className="bg-card p-4 rounded-lg border">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="font-semibold text-lg">{note.title}</Text>
                  <Text className="text-muted-foreground mt-1" numberOfLines={2}>
                    {note.content}
                  </Text>
                  <Text className="text-xs text-muted-foreground mt-2">
                    {note.date}
                  </Text>
                </View>
                <View className="ml-3 space-y-1">
                  <Button variant="link" size="sm">
                    <ButtonText>Editar</ButtonText>
                  </Button>
                  <Button variant="link" size="sm">
                    <ButtonText>Excluir</ButtonText>
                  </Button>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Empty State */}
        {mockNotes.length === 0 && (
          <View className="flex-1 items-center justify-center space-y-4">
            <Text className="text-4xl">📝</Text>
            <Text className="text-lg font-semibold">Nenhuma nota encontrada</Text>
            <Text className="text-muted-foreground text-center">
              Crie sua primeira nota para começar a organizar suas ideias
            </Text>
            <Button 
              variant="outline" 
              size="lg"
              onPress={() => router.push('/notes/create')}
            >
              <ButtonText>Criar Primeira Nota</ButtonText>
            </Button>
          </View>
        )}

        {/* Navigation */}
        <View className="space-y-3">
          <Button 
            variant="outline" 
            size="lg"
            onPress={() => router.push('/profile')}
          >
            <ButtonText>Perfil</ButtonText>
          </Button>

          <Button 
            variant="outline" 
            size="lg"
            onPress={() => router.push('/main')}
          >
            <ButtonText>Voltar ao Início</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
} 