import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { Button, ButtonText } from '@/components/ui/button';

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar a nota
    console.log('Salvando nota:', { title, content });
    router.push('/notes');
  };

  return (
    <View className="flex-1 p-6">
      <View className="space-y-6">
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold">Nova Nota</Text>
          <Button 
            variant="outline" 
            size="sm"
            onPress={() => router.back()}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Title Input */}
          <View className="space-y-2">
            <Text className="font-semibold">Título</Text>
            <TextInput
              className="bg-card border border-border rounded-lg p-3 text-foreground"
              placeholder="Digite o título da nota..."
              placeholderTextColor="#6B7280"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Content Input */}
          <View className="space-y-2">
            <Text className="font-semibold">Conteúdo</Text>
            <TextInput
              className="bg-card border border-border rounded-lg p-3 text-foreground min-h-[200px]"
              placeholder="Digite o conteúdo da nota..."
              placeholderTextColor="#6B7280"
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Actions */}
        <View className="space-y-3">
          <Button 
            variant="outline" 
            size="lg"
            action="positive"
            onPress={handleSave}
            disabled={!title.trim() || !content.trim()}
          >
            <ButtonText>Salvar Nota</ButtonText>
          </Button>

          <Button 
            variant="outline" 
            size="lg"
            onPress={() => router.push('/notes')}
          >
            <ButtonText>Voltar às Notas</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
} 